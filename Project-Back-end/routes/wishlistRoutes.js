const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistControllers')
const {authMiddleware} = require('../middlewares/authMiddlewares')

router.post('/wishlist/:productId' , authMiddleware , wishlistController.addProductWishlist);
router.get('/wishlist' , authMiddleware , wishlistController.getWishlist)
router.delete('/wishlist/:productId' , authMiddleware , wishlistController.deleteWishlist )

module.exports = router ;