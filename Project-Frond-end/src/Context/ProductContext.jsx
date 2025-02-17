// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const ProductContext = createContext();


// function ProductProvider({ children }) {
//   // const [product, setProduct] = useState([]);  
//   const [serchTream, setSerchTream] = useState("");
//   const [cart, setCart] = useState([]);
//   const [curretUser, setCorentuser] = useState(null);
//   const [cetogery, setCetogery] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [search,setSearch]=useState('')
//   const id = localStorage.getItem("id")
//   const navigate = useNavigate();
//   const [filteredProduct, setFilteredProduct] = useState([]);
//   useEffect(() => {
//     // Save cart length to localStorage whenever cart changes
//     localStorage.setItem("cartCount", cart.length);
//     console.log(cart, "this is cart");
//   }, [cart]);

//   //fetch products in home page
//   // useEffect(() => {
//   //   const fetchProduct = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:3008/products");
//   //       setProduct(response.data);
//   //     } catch (error) {
//   //       console.error("error fetching products", error);
//   //     }
//   //   };
//   //   fetchProduct();
//   // }, []);



//   const handleAddOrder = async (order) => {
//     try {

//       setOrders((prevOrders) => [...prevOrders, order]);
//       setCart([]);
//       await axios.patch(`http://localhost:3008/user/${id}`, {
//         order:[...orders,order],
//       });
//       await axios.patch(`http://localhost:3008/user/${id}`, { cart: [] });
//       alert("Your order has been placed!");
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };
//   useEffect(() => {
//   const  fetChOrderDb = async () => {
//     try{
//     const  responce  =  await axios.get(`http://localhost:3008/user/${id}`)
//       setOrders(responce.data.order)
//     }
//     catch(error){
//       console.error(error)
//     }
//    }
//    fetChOrderDb()
//   },[id])


//   // Remove item from cart
//   const removeFromCart = async (productId) => {
//     const itemToRemove = cart.find((item) => item.id === productId);
//     if (itemToRemove) {
//       const updatedCart = cart.filter((item) => item.id !== productId);
//       setCart(updatedCart);
//       await axios.patch(`http://localhost:3008/user/${id}`, {cart:updatedCart}),(updatedCart);

//     }
//   };

//   // incrementquantity of items in cart
//   const incrementQuantity = async (productId, quantity) => {
//     const itemToUpdate = cart.find((item) => item.id === productId);
//     if (itemToUpdate) {
//       const products = product.find((prod) => prod.id === productId);
//       if (products && quantity > products.stock) { 
//         toast.error("Stock not available for this quantity.");
//         return; 
//       }
//       const updatedCart = cart.map((item) =>
//         item.id === productId
//           ? { ...item, quantity: Math.max(1, item.quantity + 1) }
//           : item
//       );
//       setCart(updatedCart); 
//       await axios.patch(`http://localhost:3008/user/${id}` , {cart:updatedCart})
//     }
//   };
  
//   //dicrementquantity of items in cart
//   const  decrementQuantity = async (productId, quantity) => {
//     const itemToUpdate = cart.find((item) => item.id === productId);
//     if (itemToUpdate) {
//       const products = product.find((prod) => prod.id === productId);
//       if (products && quantity > products.stock) { 
//         toast.error("Stock not available for this quantity.");
//         return; 
//       }
//       const updatedCart = cart.map((item) =>
//         item.id === productId
//           ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//           : item
//       );
//       setCart(updatedCart); 
//       await axios.patch(`http://localhost:3008/user/${id}` , {cart:updatedCart})
//     }
//   };

//   const addToCart = async (product) => {
//     const updatedCart = [...cart];
//     const existingItem = updatedCart.find((item) => item.id === product.id);
//     if (existingItem) {
//       existingItem.quantity += 1;
//       // alert("all rady item in cart")
//     } else {
    
//       updatedCart.push({ ...product, quantity: 1 });
//     }
//     setCart(updatedCart);
    
//    await axios.patch(`http://localhost:3008/user/${id}` , {cart:updatedCart})
//     console.log("Cart after adding product:", updatedCart);

//   };


  
 
//   useEffect(() => {
//     const fetchCartDb = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3008/user/${id}`);
//         console.log(response.data, "asdfgh");
//         setCart(response.data.cart);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCartDb();
//   }, [id]);
  

//   const totelAmount = () => {
//     const total = cart.reduce((acc, val) => acc + (val.price * val.quantity), 0);
//     return total.toFixed(2);  
//   };
  


//   return (
//     <ProductContext.Provider
//       value={{
//         totelAmount,
//         // product,
//         cart,
//         setCart,
//         incrementQuantity,
//         removeFromCart,
//         addToCart,
//         curretUser,
//         setCetogery,
//         decrementQuantity,
//         orders,
//         setOrders,
//         handleAddOrder,
//         search,
//         setSearch
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// }

// export default ProductProvider;
 

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../Slices/OrderSlice"; // Redux action to add order
import { clearCart } from "../Slices/CartSlice"; // Redux action to clear cart

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access cart and totalAmount from Redux state
  const { items: cart, totalAmount } = useSelector((state) => state.cart);

  const initialValues = {
    name: "",
    address: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be a number")
      .required("Phone number is required"),
  });

  const handleSubmit = (values) => {
    const order = {
      ...values,
      items: [...cart], // Include cart items
      totalAmount: totalAmount, // Include total amount
      orderDate: new Date().toISOString(),
    };
    dispatch(addOrder(order)); // Dispatch the order to Redux
    dispatch(clearCart()); // Clear the cart after order submission
    navigate("/"); // Navigate to homepage or confirmation page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Payment Form
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                  Address:
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                  Phone:
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="orderSummary" className="block text-sm font-medium text-gray-600">
                  Order Summary:
                </label>
                {cart.map((item) => (
                  <div key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-600">
                  Total Amount:
                </label>
                <h3>{totalAmount}</h3>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                {isSubmitting ? "Submitting..." : "Confirm Payment"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentForm;
