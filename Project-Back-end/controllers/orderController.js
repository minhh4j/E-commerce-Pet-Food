const asyncHandler = require("../middlewares/asyncHandler");
const orderService = require("../services/orderServices");

const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress  , paymentMethod } = req.body;
  
  const userId = req.user._id;

  const { newOrder, razorpayOrderId } = await orderService.createOrder(
    userId,
    shippingAddress,
    paymentMethod
  );
  
  res.status(200).json({
    message: "Order created successfully",
    order: newOrder,
    razorpayOrderId
  });
});

const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
  
    const orders = await orderService.getUserOrder(userId, page, limit);
  
    res.status(200).json({
      orders,
    });
  });
  
  const  verifyPayment = asyncHandler(async (req, res) => {
    const { paymentId, orderId } = req.body;
    try {
      const isPaymentVerified = await orderService.verifyPayment(paymentId, orderId);
      if (isPaymentVerified) {
        res.status(200).json({
          message: 'Payment verified successfully',
        });
      } else {
        throw new CustomError('Payment verification failed', 400);
      }
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Something went wrong during payment verification.',
      });
    }
  });
  

module.exports = {
  createOrder,
  getOrders ,
  verifyPayment
};
