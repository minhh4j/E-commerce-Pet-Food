import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, blockAndUnblockUser } from "../Slices/adminSlice"; 
import { fetchOrdersAsync } from "../Slices/OrderSlice";
import { toast, ToastContainer } from "react-toastify";


function UserDetails() {
  const dispatch = useDispatch();
  const { users, loading, error, currentPage, totalPages } = useSelector((state) => state.admin);

  
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(fetchAllUsers({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleBlockUnblock = (userId) => {
    dispatch(blockAndUnblockUser(userId))
      .unwrap()
      .then(() => {
        dispatch(fetchAllUsers({ page: currentPage, limit: 10 })); 
      })
      .catch((err) => console.error("Error blocking/unblocking:", err));
  };
  

  
  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch ]
  )

    
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100">
       <ToastContainer position="top-right" autoClose={500} />
      <h2 className="mb-4 text-2xl font-bold">User List</h2>
      <table className="w-full bg-white border rounded-lg shadow-lg">
        <thead className="text-white bg-black">
          <tr>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-200">
                <td className="px-4 py-2 cursor-pointer" onClick={() => handleUserClick(user)}>
                  {user.username}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    className={`text-white px-4 py-2 rounded ${user.isBlocked ? "bg-green-500" : "bg-red-500"}`}
                    onClick={() => handleBlockUnblock(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center" colSpan="3">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        <button
          onClick={() => dispatch(fetchAllUsers({ page: currentPage - 1, limit: 10 }))}
          disabled={currentPage <= 1}
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(fetchAllUsers({ page: currentPage + 1, limit: 10 }))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">{selectedUser.username}'s Details</h2>
            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {selectedUser.isBlocked ? "Blocked" : "Active"}</p>
            <button className="px-4 py-2 mt-4 text-white bg-gray-500 rounded" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;


