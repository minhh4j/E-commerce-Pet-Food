const Product = require("../models/productModels");
const Cart = require("../models/cartModels");
const CustomError = require("../utils/customError");
const {mongoose} = require('mongoose')

// add product in cart

const addToCart = async (userId, productId) => {
  const product = await Product.findById(productId);

  if (!product) throw new CustomError("Product not found", 404);

  if (product.stock <= 0) throw new CustomError("Product is out of stock", 400);

  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    cart = new Cart({ userId: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId 
  );

  if (existingItem) {
    if (existingItem.quantity + 1 > product.stock) {
      throw new CustomError("Not enough stock available", 400);
    }
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, quantity: 1 });
  }
  await cart.save();
  return cart;
};

// get cart items

const getCartDetails = async (userId, page = 1, limit = 10) =>{
    const skip = (page - 1)  * limit 
    const cart = await Cart.findOne({ userId: userId })
    .populate('items.productId')
    .skip(skip)
    .limit(limit);
    if (!cart) throw new CustomError('Cart not found', 404);
  
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    cart.totalPrice =  totalPrice.toFixed(2)  

    await cart.save(); 
    return { cart, totalPrice };
}


// remove cart product 

const removeCartProduct = async (userId ,productId) => {
  // console.log(productId);
  
  const cart = await Cart.findOne({userId})
  if(!cart) throw new CustomError('Cart not found', 404)

  const existingItem = await cart.items.find((item) => item.productId.toString() === productId);
  if(!existingItem) throw new CustomError('Product not found in cart', 404);

  cart.items.pull({productId})
  await cart.save();
  return cart ;

}

// increaseQuantity 

const increaseQuantity = async (userId , productId) => {
  const cart = await Cart.findOne({userId : userId})
  if(!cart) throw new CustomError('Cart not found', 404)

  const item = cart.items.find((item) => item.productId.toString() === productId);
  if(!item) throw new CustomError('Product not found in cart', 404)

  const product = await Product.findById(productId);
  if(!product) throw new CustomError('Product not found', 404)

  if(item.quantity +1 > product.stock){
    throw new CustomError('Not enough stock available', 400)
  }

  item.quantity += 1 ;
  await cart.save()
  return cart ;

}

// Decrease Qnty

const decreaseQuantity = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new CustomError('Cart not found', 404);

  const item = cart.items.find((item) => item.productId.toString() === productId);
  if (!item) throw new CustomError('Product not found in cart', 404);

  if (item.quantity === 1) {
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  } else {
    item.quantity -= 1;
  }

  await cart.save();
  return cart;
};



module.exports = {addToCart, getCartDetails , removeCartProduct , increaseQuantity  , decreaseQuantity}     





