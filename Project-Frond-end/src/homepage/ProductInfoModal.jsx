import React, { useContext } from "react";
// import { ProductContext } from "../Context/ProductContext";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useContext(ProductContext);

  const handleAddToCartClick = (item) => {
    if (!localStorage.getItem("id")) {
      alert("Please log in to add items to your cart.");
    } else {
      addToCart(item);
      alert(`${item.name} added to cart!`);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-6 text-white bg-gray-800 rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-2xl font-bold text-white top-4 right-4"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/3">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-sm text-gray-400">
              {product.description || "No description available."}
            </p>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Price: ₹{product.price ? product.price.toFixed(2) : "N/A"}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-gray-400 line-through">
                  Old Price: ₹{product.oldPrice.toFixed(2)}
                </p>
              )}
            </div>
            <p className="mt-4 text-sm">
              <strong>Ingredients:</strong>{" "}
              {product.ingredients ? product.ingredients.join(", ") : "N/A"}
            </p>
            <p className="mt-2 text-sm">
              <strong>Seller:</strong> {product.seller || "Unknown"}
            </p>
            <p className="mt-2 text-sm">
              <strong>Stock Left:</strong>{" "}
              {product.stock !== undefined
                ? `${product.stock} items`
                : "Out of stock"}
            </p>
          </div>
          <button
            className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
            onClick={() => handleAddToCartClick(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
