const asyncHandler = require("../middlewares/asyncHandler");
const wishlistSarvis = require('../services/wishlistServices')

const addProductWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await wishlistSarvis.addWishlist(userId, productId);
    res.status(200).json({
        message: 'Successfully added product',
        wishlist,
    });
});

const getWishlist = asyncHandler(async (req , res) => {
    const userId = req.user._id;
    
    const wishlist = await wishlistSarvis.getWishlist(userId);
    res.status(200).json({
       message: 'Wishlist fetched successfully',
       wishlist
    })
})


const deleteWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await wishlistSarvis.deleteWishlist(userId, productId);
    res.status(200).json({
        message: 'Product removed from the wishlist',
        wishlist
    });
});

module.exports = { deleteWishlist };


module.exports = {addProductWishlist , getWishlist , deleteWishlist}