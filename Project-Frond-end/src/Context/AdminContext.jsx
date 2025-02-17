import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

function AdminProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  // fetch product
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3008/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    FetchData();
  }, []);

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const respoonce = await axios.get("http://localhost:3008/user");
        const data = respoonce.data;
        const fltred = data.filter((item) => item.role != "admin");
        setUsers(fltred);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  });

  const totalRevenue = users.reduce((acc, user) => {
    user.order.forEach((order) => {
      order.items.forEach((item) => {
        acc += item.quantity * item.price;
      });
    });
    return acc;
  }, 0);

  const adminLogin = () => {
    setIsAdmin(true);
    navigate("/adminPage/dashboard");
  };

  const adminLogout = () => {
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        users,
        setUsers,
        setProducts,
        totalRevenue,
        adminLogin,
        adminLogout,
        isAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
