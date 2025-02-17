
import React, { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import axios from "axios";
import { MdClose } from "react-icons/md";

function UserDetails() {
  const { users, setUsers } = useContext(AdminContext);
  const [selectedUser, setSelectedUser] = useState(null);

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
  }

  const handleBlockUser = async (userId, userName, status) => {
    const toast = document.createElement("div");
    toast.textContent = `User with name ${userName} has been ${
      status ? "blocked":"unblocked"  
    }.`;
    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      left: "800px",
      background: "#333",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: "1000",
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    try {
      await axios.patch(`http://localhost:3008/user/${userId}`, {
        status: !status,
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: !status } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-xl">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Block User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`${
                  user.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition duration-300 ease-in-out`}
                onDoubleClick={() => setSelectedUser(user)}
              >
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleBlockUser(user.id, user.username, user.status)
                    }
                    className={ user.status ? "px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-800" : "px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-800"}
                  >
                    {user.status ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Section */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
              <MdClose
                className="absolute text-gray-600 cursor-pointer top-2 right-2"
                size={24}
                onClick={() => setSelectedUser(null)}
              />
              <h2 className="mb-4 text-xl font-bold">User Details</h2>
              <p>
                <strong>Name:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              {selectedUser.order && selectedUser.order.length > 0 ? (
                <>
                  <h3 className="mt-4 text-lg font-semibold">Orders:</h3>
                  {selectedUser.order.map((order, index) => (
                    <div key={index} className="mt-2">
                      <p>
                        <strong>Order {index + 1}:</strong>
                      </p>
                      <ul className="pl-6 list-disc">
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>
                              {item.quantity} x ₹{item.price}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <h4 className="mt-4 text-lg font-semibold">
                        Total: ₹
                        {order.items
                          .reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </h4>
                    </div>
                  ))}
                  <div className="flex items-center justify-center mt-4">
                    <p>
                      <strong>Total Amount Across All Orders:</strong>{" "}
                      ₹
                      {selectedUser.order
                        .reduce(
                          (acc, order) =>
                            acc +
                            order.items.reduce(
                              (sum, item) =>
                                sum + item.price * item.quantity,
                              0
                            ),
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </>
              ) : (
                <h3>No Orders</h3>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
