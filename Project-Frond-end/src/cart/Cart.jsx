// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   addToCart,
//   removeFromCartAsync,
//   decrementProductInDBAndCartAsync,
//   fetchCartAsync,
// } from "../Slices/CartSlice";
// import { MdDelete } from "react-icons/md";
// import { toast, ToastContainer } from "react-toastify";

// function Cart() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cart, loading, error } = useSelector((state) => state.cart);
//   console.log(cart, "cart");

//   useEffect(() => {
//     dispatch(fetchCartAsync());
//   });

//   const handleremove = async (productId) => {
//     await dispatch(removeFromCartAsync(productId))
//       .unwrap()
//       .then((response) => {
//         toast.success(response);
//         dispatch(fetchCartAsync())
//       })
//       .catch((error) => {
//         toast.error(error);
//       });
//   };

//   if (loading) return <h1>Loading...</h1>;
//   if (error) return <h1>Error: {error}</h1>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={500}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">
//           Your <span className="text-blue-500">Cart</span>
//         </h1>
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Continue Shopping
//         </button>
//       </div>

//       <div className="p-6 bg-white rounded-lg shadow-md">
//         {cart?.items.length > 0 ? (
//           <>
//             {cart?.items.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex items-center justify-between py-4 border-b border-gray-300"
//               >
//                 <img
//                   src={product.productId.image}
//                   alt={product.productId.name}
//                   className="object-cover w-24 h-24 rounded-lg"
//                 />

//                 <div className="flex-1 px-6">
//                   <h3 className="text-lg font-medium">
//                     {product.productId.name}
//                   </h3>
//                   <p className="mt-2">
//                     <span className="text-gray-400 line-through">
//                       ₹{product.productId.oldPrice}
//                     </span>{" "}
//                     <span className="text-lg font-semibold text-blue-600">
//                       ₹{product.productId.price}
//                     </span>
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() =>
//                       product.productId.quantity > 1 &&
//                       dispatch(
//                         decrementProductInDBAndCartAsync({
//                           productId: product.id,
//                         })
//                       )
//                     }
//                     className="w-8 h-8 text-lg font-bold text-red-500 bg-gray-200 rounded hover:bg-red-400 hover:text-white"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg">{product.productId.quantity}</span>
//                   <button
//                     onClick={() => dispatch(addToCart({ product }))}
//                     className="w-8 h-8 text-lg font-bold text-blue-600 bg-gray-200 rounded hover:bg-blue-400 hover:text-white"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleremove}
//                   className="ml-4 text-blue-500 hover:text-red-600"
//                   title="Remove item"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             ))}

//             <div className="mt-6 text-right">
//               <h4 className="text-lg font-semibold">
//                 {/* Total Price: <span className="text-blue-600">₹{totalAmount}</span> */}
//               </h4>
//               <button
//                 onClick={() => navigate("/payment")}
//                 className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
//               >
//                 Add Order
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-xl text-center text-gray-500">
//             Your cart is empty.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   removeFromCartAsync,
//   fetchCartAsync,
//   updateQuantity,
// } from "../Slices/CartSlice";
// import { MdDelete } from "react-icons/md";
// import { toast, ToastContainer } from "react-toastify";
// import PaymentDetails from './PaymentFrom'

// function Cart() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cart, loading, error } = useSelector((state) => state.cart);

 
//   useEffect(() => {
//     dispatch(fetchCartAsync());
//   }, [dispatch]);

//   const handleremove = async (productId) => {
//     await dispatch(removeFromCartAsync(productId))
//       .unwrap()
//       .then((response) => {
//         toast.success(response.message);
//         dispatch(fetchCartAsync());
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   const handleUpdateQuntity = async (productId, action) => {
//     await dispatch(updateQuantity(productId, action))
//       .unwrap()
//       .then((res) => {
//         toast.success(res.data.message);
//         dispatch(fetchCartAsync());
        
//       })
//       .catch((error) => {
  
//         toast.error(error.response.data.message);
//       });
//   };


//   const totalAmount = cart?.items?.reduce(
//     (total, item) => total + item.productId.price * item.quantity,
//     0
//   );

//   if (loading) return <h1>Loading...</h1>;
//   if (error) return <h1>Error: {error}</h1>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={500}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">
//           Your <span className="text-blue-500">Cart</span>
//         </h1>
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Continue Shopping
//         </button>
//       </div>

//       <div className="p-6 bg-white rounded-lg shadow-md">
//         {cart?.items.length > 0 ? (
//           <>
//             {cart?.items.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex items-center justify-between py-4 border-b border-gray-300"
//               >
//                 <img
//                   src={product.productId.image}
//                   alt={product.productId.name}
//                   className="object-cover w-24 h-24 rounded-lg"
//                 />

//                 <div className="flex-1 px-6">
//                   <h3 className="text-lg font-medium">
//                     {product.productId.name}
//                   </h3>
//                   <p className="mt-2">
//                     <span className="text-gray-400 line-through">
//                       ₹{product.productId.oldPrice}
//                     </span>{" "}
//                     <span className="text-lg font-semibold text-blue-600">
//                       ₹{product.productId.price}
//                     </span>
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => handleUpdateQuntity({productId: product.productId._id, action: 'decrease'})}
//                     className="w-8 h-8 text-lg font-bold text-red-500 bg-gray-200 rounded hover:bg-red-400 hover:text-white"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg">{product.quantity}</span>
//                   <button
//                     onClick={() => handleUpdateQuntity({ productId: product.productId._id, action: 'increase' })}
//                     className="w-8 h-8 text-lg font-bold text-blue-600 bg-gray-200 rounded hover:bg-blue-400 hover:text-white"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => handleremove( product.productId._id)}
//                   className="ml-4 text-blue-500 hover:text-red-600"
//                   title="Remove item"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             ))}

//             <div className="mt-6 text-right">
//             <PaymentDetails />
//               <h4 className="text-lg font-semibold">
//                 Total Price:{" "}
//                 <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
//               </h4>
//               <button
//                 onClick={() => navigate("/payment")}
//                 className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
//               >
//                 Add Order
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-xl text-center text-gray-500">
//             Your cart is empty.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;




import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCartAsync,
  fetchCartAsync,
  updateQuantity,
} from "../Slices/CartSlice";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import PaymentDetails from "./PaymentFrom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
 console.log(cart , 'cart')

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const handleremove = async (productId) => {
    await dispatch(removeFromCartAsync(productId))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        dispatch(fetchCartAsync());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleUpdateQuntity = async (productId, action) => {
    await dispatch(updateQuantity(productId, action))
      .unwrap()
      .then((response) => {
        console.log(response , 'res')
        toast.success(response.message);
        dispatch(fetchCartAsync());
        
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Your <span className="text-blue-500">Cart</span>
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Continue Shopping
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        {cart?.items.length > 0 ? (
          <>
            {cart?.items.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between py-4 border-b border-gray-300"
              >
                <img
                  src={product.productId.image}
                  alt={product.productId.name}
                  className="object-cover w-24 h-24 rounded-lg"
                />

                <div className="flex-1 px-6">
                  <h3 className="text-lg font-medium">
                    {product.productId.name}
                  </h3>
                  <p className="mt-2">
                    <span className="text-gray-400 line-through">
                      ₹{product.productId.oldPrice}
                    </span>{" "}
                    <span className="text-lg font-semibold text-blue-600">
                      ₹{product.productId.price}
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuntity({productId: product.productId._id, action: 'decrease'})}
                    className="w-8 h-8 text-lg font-bold text-red-500 bg-gray-200 rounded hover:bg-red-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-lg">{product.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuntity({ productId: product.productId._id, action: 'increase' })}
                    className="w-8 h-8 text-lg font-bold text-blue-600 bg-gray-200 rounded hover:bg-blue-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleremove( product.productId._id)}
                  className="ml-4 text-blue-500 hover:text-red-600"
                  title="Remove item"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <PaymentDetails />
            {/* <div className="mt-6 text-right">
              <h4 className="text-lg font-semibold">
                Total Price:{" "}
                <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
              </h4>
              <button
                onClick={() => navigate("/payment")}
                className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
              >
                Add Order
              </button>
            </div> */}
          </>
        ) : (
          <p className="text-xl text-center text-gray-500">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;