const Product = require('../models/productModels')
const CustomError = require('../utils/customError')
const Whishlist = require('../models/wishlistModels')
const mongoose = require('mongoose')

const addWishlist = async (userId , productId) => {
    try{

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new CustomError("Invalid product ID format", 400);
        }
        const product = await Product.findById(productId)
        if(!product) throw new CustomError('Product not found', 404)
    
        let wishlist = await Whishlist.findOne({userId: userId})
        if(!wishlist){
            wishlist = new Whishlist({userId : userId , items : []})
        }
    
        const existingProduct = wishlist.items.find((item) => item.productId.toString() === productId)
        if(existingProduct){
            return {
                massage: 'Product already exists in the wishlist',
                wishlist
            }
        }
        wishlist.items.push({productId})
        await wishlist.save()
        return wishlist ;
    }
    catch(error){
        throw error
    }
}

const getWishlist = async (userId) => {
    try {
      const wishlist = await Whishlist.findOne({ userId: userId }).populate('items.productId');
      if (!wishlist) throw new CustomError('Wishlist not found', 404);
      
      return wishlist;
    } catch (error) {
      throw error;
    }
  };

  const deleteWishlist = async (userId, productId) => {
    try {
      const result = await Whishlist.updateOne(
        { userId: userId },
        { $pull: { items: { productId: productId } } }
      );
  
      if (result.modifiedCount === 0) {
        throw new CustomError('Product not found in wishlist', 404);
      }
  
      return { message: 'Product removed from wishlist successfully' };
    } catch (error) {
      throw error;
    }
  };

module.exports = {addWishlist , getWishlist , deleteWishlist} 





