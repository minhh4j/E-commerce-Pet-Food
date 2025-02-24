const Cart = require("../models/cartModels");
const CustomError = require("../utils/customError");
const Order = require("../models/orderModal");
const razorpayInstance = require('../config/razorpay')


const createOrder = async (userId, shippingAddress, paymentMethod) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new CustomError("Your cart is empty.", 400);
  }

  let totalAmount = 0;
  const orderItems = [];
  for (const cartItem of cart.items) {
    const product =cartItem.productId;
    if (!product) throw new CustomError("Product not found.", 404);

    if (product.stock < cartItem.quantity || product.isDeleted) {
      throw new CustomError(
        `Insufficient stock or deleted product: ${product.name}`,
        400
      );
    }

    const securedPackagingFee = 39;
    totalAmount += product.price * cartItem.quantity + securedPackagingFee;
    orderItems.push({ productId: product._id, quantity: cartItem.quantity });

    product.stock -= cartItem.quantity;
    await product.save();
  }

  const newOrder = await new Order({
    userId,
    items: orderItems,
    shippingAddress,
    totalAmount,
    orderStatus: "Processing",
  }).save();

  if (paymentMethod === "razorpay") {
    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_receipt_${newOrder._id}`,
      payment_capture: 1,
    };

    try {
      const razorpayOrder = await razorpayInstance.orders.create(options);
      newOrder.razorpayOrderId = razorpayOrder.id;
      await newOrder.save();
      cart.items = [];
      await cart.save();
      return { newOrder, razorpayOrderId: razorpayOrder.id };
    } catch (error) {
      throw new CustomError("Razorpay order creation failed", 500);
    }
  }

  
  return { newOrder };
};


const verifyPayment = async (paymentId, razorpayOrderId) => {
  console.log(razorpayOrderId)
  const order = await Order.findOne({ razorpayOrderId }).populate('items.productId');
  if (!order) {
    throw new CustomError('Order not found', 400);
  }

  try {
    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);

    if (paymentDetails.status === 'captured') {
      order.razorpayPaymentStatus = 'paid';
      order.orderStatus = 'Placed';
      await order.save();
      return true;
    } else {
      throw new CustomError('Payment verification failed', 400);
    }
  } catch (error) {
    console.error('Error during payment verification:', error);
    throw new CustomError('Payment verification failed', 500);
  }
};


const getUserOrder = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1 ) * limit ; 
    const orders = await Order.find({ userId }).sort({ createdAt: -1 })
    .populate('items.productId')
    .skip(skip)
    .limit(limit);

    if (!orders.length) return [];

    return orders ; 
}

module.exports = { createOrder , getUserOrder  , verifyPayment};