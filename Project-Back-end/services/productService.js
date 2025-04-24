const mongoose = require("mongoose");
const Product = require("../models/productModels");
const CustomError = require("../utils/customError");

exports.getProductService = async ({ id, page, limit, name, category }) => {
  const skip = (page - 1) * limit;

  const match = { isDeleted: false };

  if (name) {
    match.name = { $regex: name, $options: "i" };
  }

  if (category) {
    match.category = { $regex: category, $options: "i" };
  }

  if (id) {
    match._id = new mongoose.Types.ObjectId(id);
  }

  const pipline = [
    { $match: match },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ];

  const product = await Product.aggregate(pipline);

  if (id && product.length === 0) {
    throw new CustomError("Product not found or is deleted", 404);
  }

  const total = await Product.countDocuments({ isDeleted: false, ...match });
  const totalCatCategory = await Product.countDocuments({
    isDeleted: false,
    category: "cat",
  });
  const totalDogCategory = await Product.countDocuments({
    isDeleted: false,
    category: "dog",
  });
  return { product, total, totalCatCategory, totalDogCategory };
};

 

exports.addProducts = async (productData) => {
  const existingProduct = await Product.findOne({name:productData.name})
  if(existingProduct){
   throw new Error("Product already exists");
  }
  const product = await Product.create(productData)
  return product
}


exports.deleteProduct = async(productId) => {
  const product = await Product.findByIdAndUpdate(
    productId, 
    {isDeleted:true},
    {new : true }
  )
  if(!product){
    throw new CustomError('Product is not fount' , 404)
  }
  return product ;
}




exports.updateProducts = async (productId,updateData) => {
  
  const product = await Product.findOneAndUpdate(
    { _id: productId, isDeleted: false},
    { $set: { ...updateData } },
    { new: true }
  );
  
  if(!product){
    throw new CustomError('Product is not fount' , 404)
  }
  return product ;
}

