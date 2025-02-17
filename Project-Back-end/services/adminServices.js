const User = require("../models/userModule");
const Order = require("../models/orderModal");
const customError = require("../utils/customError");

// get all users

exports.getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find({ role: "user" })
    .skip(skip)
    .limit(limit)
    .select("-password")
    .sort({ createdAt: -1 });
  const totalUser = await User.countDocuments({ role: "user" });

  return {
    users,
    totalUser,
  };
};

// get user by id

exports.getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new customError("User not found", 404);
  }
  if (user.role === "admin") {
    throw new customError("Admins are not allowed", 403);
  }

  return user;
};

// block and unblock

exports.blockUnblock = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new customError("User not fount", 404);
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  return user;
};


//  get all orders

exports.getAllOrderesProduct = async (page, limit) => {
  const skip = (page - 1) * limit;
  const order = await Order.find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "userId", select: "-password" })
    .populate("items.productId")
    .sort({ createdAt: -1 });
  const totalOrders = await Order.countDocuments();
  return {
    order,
    currantPage: page,
    totalPage: Math.ceil(totalOrders / limit),
    totalOrders,
  };
};



exports.getTotalRevenue = async () => {
  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return {
    revanue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    message: "💰 Total Sales Revenue",
  };
};



exports.getTopSellProducts = async () => {
  try {
    const topSellingProducts = await Order.aggregate([
      { $unwind: "$items" }, 
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" } 
        }
      },
      { $sort: { totalSold: -1 } }, 
      { $limit: 10 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" }, 
      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          totalSold: 1
        }
      }
    ]);

    return topSellingProducts;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    throw new Error(`Failed to get top selling products: ${error.message}`);
  }
}









// exports.changeOrderStatus = async (id) => {
//   const order = await Order.findById(id);

//   if (!order) {
//     throw new Error('Order not found');
//   }
  
//   let newStatus;
//   if (order.status === 'placed') {
//     newStatus = 'shipped';
//   } else if (order.status === 'shipped') {
//     newStatus = 'delivered';
//   } else if (order.status === 'delivered') {
//     newStatus = 'cancelled';
//     order.razorpayPaymentStatus = 'refunded'
//   } else {
//     return order; 
//   }
//   order.status = newStatus;

//   await order.save();

//   return order;
// };