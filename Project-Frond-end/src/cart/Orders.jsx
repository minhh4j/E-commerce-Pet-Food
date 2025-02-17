import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAsync } from "../Slices/OrderSlice";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const userId = "a5eb"; // Replace with dynamic ID from state, if available
    dispatch(fetchOrdersAsync(userId));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Your Orders</h1>

      {orders.length > 0 ? (
        orders.slice().reverse().map((order, index) => (
          <div key={index} className="p-6 mb-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Order #{index + 1}</h3>
            <p className="mt-2 text-sm text-gray-500">
              Order Date: {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <h4 className="mt-4 text-lg font-semibold">
              Total: ₹{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </h4>
            <p className="mt-2 text-sm text-gray-500">Name: {order.name}</p>
            <p className="mt-2 text-sm text-gray-500">Phone Number: {order.phone}</p>
            <p className="mt-2 text-sm text-gray-500">Address: {order.address}</p>

            <ul className="mt-4">
              {order.items.map((product, idx) => (
                <li key={idx} className="flex justify-between py-2 border-b border-gray-300">
                  <span>{product.name} (x{product.quantity})</span>
                  <span>₹{(product.price * product.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-xl text-center text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
}

export default Orders;
