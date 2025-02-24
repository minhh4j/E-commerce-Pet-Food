import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../Slices/SearchSlice"; 
import { fetchCartAsync } from "../Slices/CartSlice";
import { GiLoveHowl } from "react-icons/gi";
import { logoutUser } from "../Slices/AuthSlice";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);

  const username = localStorage.getItem("username");
  const isLoggedIn = Boolean(localStorage.getItem("username"));

  const { cart } = useSelector((state) => state.cart);
  const { query } = useSelector((state) => state.search); 
  const { auth } = useSelector((state) => state.auth)
  
  console.log(auth , 'auth')
  
  
  useEffect(() => {
    dispatch(fetchCartAsync())
  }, [dispatch]);
  
  const cartCount = cart?.length;

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    dispatch(setSearch(searchValue)); 
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const logout = () => {
    try {
      localStorage.clear();
      dispatch(logoutUser())
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
          console.error("Logout error:", error);
      });
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow-md">
      <div className="container flex flex-wrap items-center justify-between px-4 py-3 mx-auto md:flex-nowrap">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center text-xl font-semibold cursor-pointer"
        >
          <img
            src="https://images-platform.99static.com//N4VUoRJLktkazbY_0VENbLXlRyI=/13x0:1589x1576/fit-in/500x500/99designs-contests-attachments/98/98546/attachment_98546587"
            alt="Pet Store Logo"
            className="w-10 h-10 mr-2"
          />
          <span>
            Pet <span className="text-blue-500">Paradise</span>
          </span>
        </div>

        {/* Search Bar */}
         <div className="relative flex items-center flex-grow max-w-lg mx-4 md:mx-8">
          <input
            type="text"
            placeholder="Search for products..."
            onChange={handleSearch}
            value={query} // Controlled input for the search term
            className="w-full px-4 py-2 text-sm text-gray-700 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
          />
          <button className="p-2 text-white transition-all duration-200 ease-in-out bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            <IoMdSearch className="text-xl" />
          </button>
        </div> 
        

        {/* Navigation Icons */}
        <div className="flex items-center space-x-6 text-sm md:text-base">
        <div
            className="flex flex-col items-center text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/wishlist")}
          >
            <GiLoveHowl size="1.5em" />
            <span>Wishlist</span>
          </div>
          <div
            className="flex flex-col items-center text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/orders")}
          >
            <AiOutlineUnorderedList size="1.5em" />
            <span>Orders</span>
          </div>
          <div
            className="relative flex flex-col items-center text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/cartlist")}
          >
            <FaCartShopping size="1.5em" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <div className="relative flex flex-col items-center" ref={ref}>
            <span
              className="text-gray-600 cursor-pointer hover:text-blue-500"
              onClick={toggleDropdown}
            >
               <RiUser3Fill size="1.5em" />
              {isLoggedIn ? username : "Login"}
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 z-20 mt-2 bg-white border rounded shadow-lg">
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
