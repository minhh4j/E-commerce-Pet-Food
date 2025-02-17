const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares')


router.get('/users' , authMiddleware , isAdmin , adminController.getAllUsers )
router.get('/users/:id' , authMiddleware , isAdmin , adminController.userGetById)
router.put('/users/:id/block-unblock' , authMiddleware , isAdmin , adminController.userBlockUnblock)
router.get('/orders' , authMiddleware , isAdmin ,adminController.getAllOrderProducts)
router.get('/revanue' ,authMiddleware , isAdmin , adminController.totalRevanue)
router.get('/top-selling-products', authMiddleware , isAdmin , adminController.topSaleProducts)
// router.put('/orders/:id/toggle-status' , authMiddleware , isAdmin , adminController.changeOrderStatus)
module.exports = router ;  