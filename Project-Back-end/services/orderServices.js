const Cart = require("../models/cartModels");
const CustomError = require("../utils/customError");
const Order = require("../models/orderModal");

const createOrder = async (userId, shippingAddress) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart || cart.items.length === 0) {
    throw new CustomError("Your cart is empty.", 400);
  }

  let totalAmount = 0;
  const orderItems = [];

  for (const cartItem of cart.items) {
    const product = cartItem.productId;
    if (!product) throw new CustomError("Product not found.", 404);

    if (product.stock < cartItem.quantity || product.isDeleted) {
      throw new CustomError(
        `Insufficient stock or deleted product: ${product.name}`,
        400
      );
    }
    let securedPackagingFee = 39;
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


  cart.items = [];
  await cart.save();
  return { newOrder };
};



const getUserOrder = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1 ) * limit ; 
    const orders = await Order.find({ userId }).sort({ createdAt: -1 })
    .populate('items.productId')
    .skip(skip)
    .limit(limit);

    if (!orders.length) throw new CustomError('No orders found for this user', 404);

    return orders ; 
}
module.exports = { createOrder , getUserOrder };
