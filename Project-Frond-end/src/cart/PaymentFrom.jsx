// import React, { useContext } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// // import { ProductContext } from "../Context/ProductContext";
// import { useNavigate } from "react-router-dom";



// const PaymentForm = () => {
    
//     // const {handleAddOrder , totelAmount ,cart } = useContext(ProductContext);
//     const navigate = useNavigate()
    
//   const initialValues = {
//     name: "",
//     address: "",
//     phone: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     address: Yup.string().required("Address is required"),
//     phone: Yup.string()
//       .matches(/^[0-9]+$/, "Phone must be a number")
//       .required("Phone number is required"),
//   });
    
  
//   const handleSubmit = (values) => {
//     console.log(values);
//     const order = {
//         ...values,
//         items: [...cart],
//         totalAmount: totelAmount,
//         orderDate: new Date().toISOString(),
//       };
//       handleAddOrder(order)
//       navigate("/")
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
//           Payment Form
//         </h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-600">
//                   Name:
//                 </label>
//                 <Field
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className="text-sm text-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="address" className="block text-sm font-medium text-gray-600">
//                   Address:
//                 </label>
//                 <Field
//                   type="text"
//                   id="address"
//                   name="address"
//                   className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="address"
//                   component="div"
//                   className="text-sm text-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
//                   Phone:
//                 </label>
//                 <Field
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="phone"
//                   component="div"
//                   className="text-sm text-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="orderSummary" className="block text-sm font-medium text-gray-600">
//                   Order Summary:
//                 </label>
//               {cart.map((item) => (
//                 <div>
//                     <span>{item.name}</span>
//                     <span>{item.quantity}</span>
//                 </div>
//               ))}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-600">
//                   Total Amount:
//                 </label>
        
//                <h3>{totelAmount()}</h3>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
//               >
//                 {isSubmitting ? "Submitting..." : "Confirm Payment"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrderAsync } from "../Slices/OrderSlice"; // Redux action to add order
// import { clearCart } from "../Slices/CartSlice"; // Redux action to clear cart

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
    dispatch(addOrderAsync(order)); // Dispatch the order to Redux
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
