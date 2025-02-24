import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAsync } from "../Slices/OrderSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);   
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch ]);

  if (loading)
    return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;

  if (error) {
    console.error("Fetch Orders Error:", error); 
    return <div className="text-center text-red-500">Error: {error.message || "Failed to fetch orders"}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center">Your Orders</h1>

      {orders.length > 0 ? (
        orders.slice().reverse().map((order, index) => (
          <div key={index} className="p-6 mb-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Order #{index + 1}</h3>
            <p className="mt-2 text-sm text-gray-600">
            Order Date: {order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy, hh:mm aa") : "N/A"}
            </p>
            <h4 className="mt-4 text-lg font-semibold text-green-700">
              Total: ₹{order.totalAmount?.toFixed(2) || "0.00"}
            </h4>

            {/* Shipping Address Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Shipping Details</h3>
              <p className="text-sm text-gray-600">Full Name: {order.shippingAddress?.FullName }</p>
              <p className="text-sm text-gray-600">Country: {order.shippingAddress?.country }</p>
              {/* <p className="text-sm text-gray-600">Address: {order.shippingAddress?.address || "N/A"}</p> */}
              <p className="text-sm text-gray-600">Post Code: {order.shippingAddress?.PostCode }</p>
              <p className="text-sm text-gray-600">City: {order.shippingAddress?.city }</p>
            </div>

            {/* Delivery Date */}
            <h3 className="mt-4 text-sm font-semibold text-indigo-600">
              Delivery Date: {order.DeliveryDate ? format(new Date(order.DeliveryDate), "dd MMM yyyy") : "Not Available"}
            </h3>
            <span className="font-semibold text-blue-600">
            TotalAmount : ₹{order.totalAmount || "0.00"}
                  </span>
          </div>
        ))
      ) : (
        <p className="text-xl text-center text-gray-500">You have no orders yet.</p>
      )}
        <button
      onClick={() => navigate("/")}
      className="px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
    >
      Go Home
    </button>
    </div>
  );
}

export default Orders;
