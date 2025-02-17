import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

function SideBar() {
  const navigate = useNavigate();
  const {adminLogout} = useContext(AdminContext)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 flex flex-col w-64 h-full p-6 text-white bg-black shadow-xl">
        {/* Logo */}
        <div className="mb-8 text-2xl font-semibold text-center">
          <img
            src="https://img.freepik.com/free-photo/view-cats-dogs-showing-friendship_23-2151806310.jpg?t=st=1732516811~exp=1732520411~hmac=f2a665a7b2d56920fafe2ba55287068fd08d42bfc366d73e706c601e6277a432&w=1380"
            alt="Logo"
            className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <span className="text-3xl font-extrabold text-white transition-colors duration-300 cursor-pointer hover:text-yellow-400">
            Pet Paradise
          </span>
        </div>

        {/* Sidebar Menu */}
        <div className="space-y-6">
          <button
            className="w-full p-3 text-lg text-left transition-colors duration-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={() => navigate("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="w-full p-3 text-lg text-left transition-colors duration-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={() => navigate("user-details")}
          >
            User
          </button>
          <button
            className="w-full p-3 text-lg text-left transition-colors duration-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white"
            onClick={() => navigate("handle-products")}
          >
            Products
          </button>
          <button className="w-full p-3 text-lg text-left transition-colors duration-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white"
          onClick={adminLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
