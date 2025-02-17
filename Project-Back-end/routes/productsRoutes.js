const express = require('express')
const productController = require('../controllers/productController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares')
const upload = require('../middlewares/uploadMiddleware')
const routes = express.Router()


routes.get('/products',productController.getProducts)
routes.get('/products/:id',productController.getProducts)
routes.post('/addproducts' , authMiddleware , isAdmin , upload.single('image'), productController.addProducts);
routes.delete('/deleteproduct/:productId' , authMiddleware , isAdmin , productController.deleteProduct)
routes.patch('/updateproduct/:id' , authMiddleware , isAdmin , upload.single('image'), productController.updateProduct)


module.exports = routes

