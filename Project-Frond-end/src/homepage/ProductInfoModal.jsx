import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../Slices/ProductSlice";
import { addToCart } from "../Slices/CartSlice";
import { toast, ToastContainer } from "react-toastify";

function ProductInfoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (products.length) {
      const foundProduct = products.find((item) => String(item._id) === String(id));
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  const handleAddToCartClick = async (product) => {
    dispatch(addToCart(product._id)).then((response) => {
      if (response?.payload) {
        toast.error(response.payload);
      }
      if (response?.payload?.message) {
        toast.success(response?.payload?.message);
      }
    });
  };

  if (loading) {
    return <h1 className="mt-10 text-xl font-semibold text-center">Loading product...</h1>;
  }

  if (error) {
    return <h1 className="mt-10 text-xl text-center text-red-500">Error: {error}</h1>;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-red-600">Product Not Found</h1>
        <Link to="/" className="px-4 py-2 mt-4 text-white bg-gray-500 rounded-md hover:bg-gray-700">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <ToastContainer position="top-right" autoClose={500} />

      {/* Back Button */}
      <Link to="/" className="text-gray-700 hover:underline">← Back to Products</Link>

      <div className="grid grid-cols-1 gap-8 mt-6 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-lg text-gray-500">Category: <span className="font-medium text-gray-700">{product.category}</span></p>

          {/* Price */}
          <div className="flex items-center mt-3 space-x-4">
            {product.oldPrice && (
              <p className="text-xl font-medium text-gray-400 line-through">₹{product.oldPrice}</p>
            )}
            <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
          </div>

          {/* Seller Info */}
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Sold by:</span> {product.seller}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Ingredients */}
          {product.ingredients && (
            <p className="mt-3 text-gray-600">
              <span className="font-semibold">Ingredients:</span> {product.ingredients.join(", ")}
            </p>
          )}

          {/* Stock */}
          <p className="mt-2">
            <span className="font-semibold">Stock:</span>{" "}
            <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? "Available" : "Out of Stock"}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex mt-6 space-x-4">
            <button
              className="px-5 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-800"
              onClick={() => handleAddToCartClick(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoPage;
