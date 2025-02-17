const asyncHandler = require("../middlewares/asyncHandler");
const orderService = require("../services/orderServices");

const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  const userId = req.user._id;

  const { Order } = await orderService.createOrder(
    userId,
    shippingAddress
  );
  res.status(200).json({
    message: "Order created successfully",
    Order,
  });
});

const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query; // Fixed typo and added default values
  
    const orders = await orderService.getUserOrder(userId, page, limit);
  
    res.status(200).json({
      orders,
    });
  });
  

module.exports = {
  createOrder,
  getOrders
};
