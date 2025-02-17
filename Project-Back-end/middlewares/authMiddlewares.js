const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const User = require('../models/userModule')

const authMiddleware = async (req, res, next) => {
  let token;

  try {
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      res
        .status(401)
        .json({ isAuthenticated: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user.isBlocked) {
      return res
        .status(403)
        .json({ message: "User is blocked. Please contact support." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(
        new CustomError("Access token expired, please refresh your token", 401)
      );
    } else {
      return next(new CustomError("Not authorized, token invalid", 401));
    }
  }
};

const isAdmin = (req , res , next ) => {
  if(req.user && req.user.role === "admin"){
    next();
  }
  else{
    throw new CustomError('Access denied, only admins can access this', 403)
  }
}

module.exports = {authMiddleware , isAdmin} ; 
