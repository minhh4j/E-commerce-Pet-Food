const express = require('express');
const { registerUser, loginUser, logout, getLoggedInUser } = require('../controllers/userControler');
const { authMiddleware } = require('../middlewares/authMiddlewares');

const router = express.Router()

router.post('/register', registerUser);
router.post('/login' , loginUser);
router.post('/logout' , logout)
router.get('/me' , authMiddleware , getLoggedInUser )

module.exports = router ;