const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddlewares');
const { createOrder, getOrders } = require('../controllers/orderController');

const router = express.Router();

router.post('/order/create', authMiddleware, createOrder);

router.get('/order' , authMiddleware , getOrders)
module.exports = router; 