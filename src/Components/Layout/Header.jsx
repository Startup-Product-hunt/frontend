import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import LoginModal from "../Modals/LoginModel";
import api from "../../api/axios";
import { toast,Toaster } from "react-hot-toast";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
      console.log(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <><Toaster/>
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ProductHunt
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-500 transition">
            About
          </Link>
          <Link to="/business" className="hover:text-indigo-500 transition">
            Business
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-500 transition"
              >
                <FaUserCircle size={22} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-indigo-500 transition"
            >
              Login
            </button>
          )}
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 px-6 py-4 text-gray-700 font-medium">
            <Link to="/" onClick={closeMenu} className="hover:text-indigo-500">
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-indigo-500"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="hover:text-indigo-500"
            >
              Service
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="hover:text-indigo-500"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="text-left hover:text-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  closeMenu();
                }}
                className="text-left hover:text-indigo-500"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-0 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowLogin(false)}
            >
              <FaTimes size={20} />
            </button>
            <LoginModal
              onSuccess={(user) => {
                setUser(user);
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
