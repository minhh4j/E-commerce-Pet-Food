const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddlewares')
const cartController = require('../controllers/cartControllers');
const router = express.Router()

router.post('/cart/:productId', authMiddleware,cartController.addProductToCart )
router.get('/cart' , authMiddleware , cartController.getCartDeatails)
router.delete('/cart/:productId', authMiddleware , cartController.deleteProductFromCart)
router.put('/cart/:productId/increase' , authMiddleware , cartController.increaseCartQuantity)
router.put('/cart/:productId/decrease' , authMiddleware , cartController.decreaseCartQuantity)

module.exports = router ;

