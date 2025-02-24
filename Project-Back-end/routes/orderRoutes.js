const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddlewares');
const { createOrder, getOrders, verifyPayment } = require('../controllers/orderController');

const router = express.Router();

router.post('/order/create', authMiddleware, createOrder);

router.get('/order' , authMiddleware , getOrders)

router.post('/verify-payment', verifyPayment);
module.exports = router; 