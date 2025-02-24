const asyncHandler = require("../middlewares/asyncHandler");
const productServices = require("../services/productService");

exports.getProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10, name, category } = req.query;

  const { product, total, totalCatCategory, totalDogCategory } =
    await productServices.getProductService({
      id,
      category,
      name,
      page: parseInt(page),
      limit: parseInt(limit),
    });

  return res.status(200).json({
    success: true,
    product: product.length,
    total,
    page: Math.ceil(total / limit),
    currentPage: parseInt(page),
    product,
    totalDogCategory,
    totalCatCategory,
  });
});

exports.addProducts = asyncHandler(async (req, res) => {
    const productData = req.body;

    console.log(productData,"product data....")
    if (req.file && req.file.path) {
        productData.image = req.file.path;
    } else {
        return res.status(400).json({
            success: false,
            message: "Image upload failed. Please include a valid image file.",
        });
    }

    const product = await productServices.addProducts(productData);
    res.status(201).json({
        success: true,
        message: "Product added successfully",
        product,
    });
   
});


exports.deleteProduct = asyncHandler( async (req,res) => {
    const {productId} = req.params ;

    const product = await productServices.deleteProduct(productId)
    res.status(200).json({
        success:true,
        message:'Product deleted successfully',
        product
    })
})

exports.updateProduct = asyncHandler( async (req ,res) => {
    const {id} = req.params;
    const updateData = req.body;
    console.log(req.body, "body");
    

    if(req.file){
        updateData.image = req.file.path;
    }

    const product = await productServices.updateProducts(id,updateData);
    res.status(200).json({
        success:true,
        message:'Product updated successfully',
        product
    })
  
})