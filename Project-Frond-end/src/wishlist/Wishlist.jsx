import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWishlist,
  removeProductFromWishlist,
} from "../Slices/WishlistSlice";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);

  const handleRemoveToWishlist = (productId) => {
    dispatch(removeProductFromWishlist(productId)).then(() => {
      dispatch(getUserWishlist());
    });
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* Centered Heading with Theme Colors */}
      <h1 className="mb-6 text-3xl font-bold text-center text-[#406882]">
        My Wishlist
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : wishlist?.items?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.items.map((item) => (
            <div
              key={item._id}
              className="p-3 transition-all transform bg-white border border-[#BDD5E7] shadow-md rounded-xl hover:shadow-lg hover:scale-100 hover:bg-[#E5F3FD] hover:translate-y-1 duration-300"
            >
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="object-contain w-full rounded-md h-36"
              />
              <h2 className="mt-2 text-base font-semibold text-[#406882] hover:text-[#316B83] transition-colors duration-200">
                {item.productId.name}
              </h2>

              {/* Price Section */}
              <div className="flex items-center mt-1 space-x-2">
                <span className="text-sm font-bold text-[#316B83]">
                  ₹{item.productId.price}
                </span>
                {item.productId.oldPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{item.productId.oldPrice}
                  </span>
                )}
              </div>

              {/* Remove Button */}
              <button
                className="w-full px-3 py-2 mt-3 font-semibold text-white transition bg-[#9ABDDC] rounded-md hover:bg-[#7FA6C3] transform hover:scale-95 duration-300"
                onClick={() => handleRemoveToWishlist(item.productId._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 text-white bg-[#406882] rounded-md shadow-md hover:bg-[#316B83] hover:shadow-lg transform hover:scale-105 duration-300"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
