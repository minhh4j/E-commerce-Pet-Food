const asyncHandler = require("../middlewares/asyncHandler");
const adminSarvices = require("../services/adminServices");

//GEt all users

exports.getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const Users = await adminSarvices.getAllUsers(page, limit);
  res.status(200).json({
    Users,
  });
});

// get user by id

exports.userGetById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await adminSarvices.getUserById(id);
  res.status(200).json(user);
});

// user block and unblock

exports.userBlockUnblock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await adminSarvices.blockUnblock(id);
  res.status(200).json(user);
});

// get all orders

exports.getAllOrderProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.params;
  const order = await adminSarvices.getAllOrderesProduct(page, limit);
  res.status(200).json(order);
});

// get totalrevanue

exports.totalRevanue = asyncHandler(async (req, res) => {
  const revanue = await adminSarvices.getTotalRevenue();
  res.status(200).json(revanue);
});

// get top sale products

exports.topSaleProducts = asyncHandler(async (req, res) => {
  const topSallingProduct = await adminSarvices.getTopSellProducts();
  res.status(200).json({ data: topSallingProduct });
});

// Order status

// exports.changeOrderStatus = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const updatedOrder = await adminSarvices.changeOrderStatus(id);
//   res.status(200).json(updatedOrder);
// });
