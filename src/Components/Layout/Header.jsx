import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LoginModal from "../Modals/LoginModel";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ProductHunt
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-500 transition">
            About
          </Link>
          <Link to="/business" className="hover:text-indigo-500 transition">
            Business
          </Link>
          <button
            onClick={() => setShowLogin(true)}
            className="hover:text-indigo-500 transition"
          >
            Login
          </button>
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
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
            <button
              onClick={() => {
                setShowLogin(true);
                closeMenu();
              }}
              className="hover:text-indigo-500 text-left"
            >
              Login
            </button>
          </nav>
        </div>
      )}
      {showLogin && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-0 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowLogin(false)}
            >
              <FaTimes size={20} />
            </button>
            <LoginModal />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
