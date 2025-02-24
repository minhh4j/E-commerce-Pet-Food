import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartAsync } from "../Slices/CartSlice";
import { placeOrder, verifyPayment } from "../Slices/OrderSlice";
import { toast, ToastContainer, Slide } from "react-toastify";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "INDIA",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart || cart.items?.length === 0) {
      dispatch(fetchCartAsync()).unwrap();
    }
  }, [dispatch, cart]);

  const securedPackagingFee = 39;
  const finalAmount = Math.floor((cart?.totalPrice || 0) + securedPackagingFee);

  const validateForm = () => {
    let formErrors = {};
    Object.keys(shippingDetails).forEach((key) => {
      if (!shippingDetails[key]) {
        formErrors[key] = `Please enter ${key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}`;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const orderData = {
        shippingAddress: {
          address: `${shippingDetails.streetAddress}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.postalCode}`,
          country: shippingDetails.country,
          fullName: shippingDetails.fullName,
          city: shippingDetails.city,
          postalCode: shippingDetails.postalCode,
        },
        orderedItems: cart?.items || [],
        totalAmount: finalAmount,
        paymentMethod: "razorpay",
      };
      dispatch(placeOrder(orderData))
        .unwrap()
        .then((response) => {
          console.log(response, 'kkk');
          if (response.razorpayOrderId) {

            
            openRazorpayPayment(response.razorpayOrderId, finalAmount);
          }
        })
        .catch(() => {
          toast.error("Stock Not Available");
          setIsSubmitting(false);
        });
    }
  };

  const openRazorpayPayment = (razorpayOrderId, amount) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "Pet Paradise",
      description: "Product Payment",
      order_id: razorpayOrderId,
      handler: function (response) {
        const paymentData = {
          paymentId: response.razorpay_payment_id,
          orderId: razorpayOrderId,
        };
        dispatch(verifyPayment(paymentData))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error("Payment verification failed. Please try again.");
            setPaymentError(error.message);
            setIsSubmitting(false);
          });
      },
      prefill: {
        name: shippingDetails.fullName,
      },
      theme: { color: "#F37254" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <span className="text-xl font-semibold text-center">Loading...</span>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
      />

      <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Price Details</h2>
        <div className="flex justify-between text-lg">
          <span>Price ({cart?.items?.length || 0} items)</span>
          <span>₹{Math.floor(cart?.totalPrice || 0)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Delivery Charges</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Secured Packaging Fee</span>
          <span>₹{securedPackagingFee}</span>
        </div>
        <div className="flex justify-between pt-2 mt-3 text-lg font-bold border-t">
          <span>Total Amount</span>
          <span>₹{finalAmount}</span>
        </div>
      </div>

      <div className="max-w-xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Shipping Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shippingDetails.fullName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={shippingDetails.streetAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingDetails.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingDetails.state}
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingDetails.postalCode}
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded"
              required
            />
          </div>
          {/* <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={shippingDetails.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          /> */}
          <button
            className="w-full p-3 text-white transition bg-blue-600 rounded hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Payment..." : "Proceed To Payment"}
          </button>
          {paymentError && (
            <div className="mt-2 text-sm text-red-600">{paymentError}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default PaymentDetails;
