const asyncHandler = require("../middlewares/asyncHandler");
const { registerUserSarvice, loginUserService, logoutServices, getUserDetails } = require("../services/userService");
const CustomError = require("../utils/customError");
const {registerValidation, loginValidation} = require("../utils/validators");

// register user

exports.registerUser = asyncHandler(async (req, res) => {  
  const { username, email, password, confirmPassword } = req.body;
  const { error } = registerValidation.validate({
    username,
    email,
    password,
    confirmPassword,
  });
  if (error) throw new CustomError(error.details[0].message, 400);
  const User = await registerUserSarvice({ username, email, password });

  res.status(201).json({
    message: `🎉 User ${username} registered successfully!`,
    User,
  });
});

//login user

exports.loginUser = asyncHandler(async (req, res) => { 
  const { email, password } = req.body; 
  const { error } = loginValidation.validate({ email, password });
  if (error) throw new CustomError(error.details[0].message, 400);

  const { accessToken, refreshToken, user } = await loginUserService({
    email,
    password,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, 
    path: "/",
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    path: "/",
    sameSite: "none",
  });

  res.status(200).json({
    message: `🎉 Login successful! Welcome back, 👋 !`,
    user,
  });
});


// user logout

exports.logout = asyncHandler( async (req , res) => {

  await logoutServices()

  res.clearCookie('accessToken',{
    httpOnly:true,
    secure:true,
    sameSite:'none',
    path:'/'
  })

  res.clearCookie('refreshToken',{
    httpOnly:true,
    secure:true,
    sameSite:'none',
    path:'/'
  })

  res.status(200).json({message:' Logged out successfull'})
})


// get user by id 

exports.userGetById = asyncHandler( async (req , res) => {
  const {id} = req.params ;
  const user = await  getUserById(id)
  res.status(200).json(user)
})

// get user loggin

exports.getLoggedInUser = asyncHandler(async(req, res) => {
  const user = await getUserDetails(req.user.id);  
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  res.status(200).json({ user });
});


