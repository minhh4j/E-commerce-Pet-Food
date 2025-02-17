const asyncHandler = require("../middlewares/asyncHandler");
const cartService = require('../services/cartServices');

// Add product to cart
const addProductToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const cart = await cartService.addToCart(userId, productId);
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        next(error); 
    }
};

//get product from cart 

const getCartDeatails = asyncHandler( async (req , res ,) => {
    const userId = req.user._id ;
    console.log(userId);
    
    const {page = 1 , limit = 10} = req.query ;
    const { cart } = await cartService.getCartDetails(userId, page, limit);
    return res.status(200).json({ cart });
})


// delete product frome cart 

const deleteProductFromCart = asyncHandler( async (req , res ) => {
    const userId = req.user._id ;
    const {productId} = req.params ;
    
    const updateCart = await cartService.removeCartProduct(userId , productId);
    res.status(200).json({ message: 'Product removed from the cart'});
})


// increment qty

const increaseCartQuantity = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await cartService.increaseQuantity(userId, productId);
    res.status(200).json({ message: 'Product quantity increased', cart });
})

//decreasing product qty

const decreaseCartQuantity = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await cartService.decreaseQuantity(userId, productId);
    res.status(200).json({ message: 'Product quantity decreased', cart });
});


module.exports = { addProductToCart , getCartDeatails , deleteProductFromCart , increaseCartQuantity , decreaseCartQuantity};


