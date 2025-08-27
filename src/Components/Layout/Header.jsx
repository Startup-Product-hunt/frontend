import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import LoginModal from "../Modals/LoginModel";
import api from "../../api/axios";
import { toast, Toaster } from "react-hot-toast";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // utility: safe JSON parse
  const safeParse = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  };

  // normalize name (fallback if backend returned "undefined" or empty)
  const normalizeName = (nameFromUrl, email) => {
    let name = nameFromUrl;
    if (!name || name === "undefined") {
      name = (email || "").split("@")[0] || "User";
      name = name.replace(/[._]/g, " ");
      name = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      try { name = decodeURIComponent(name); } catch {}
    }
    return name;
  };

  // Read auth from localStorage first; if none, try URL query params (Google redirect).
  const readAuthFromStorageOrUrl = () => {
    // 1) try storage
    const raw = localStorage.getItem("user");
    const stored = safeParse(raw);
    if (stored && stored.email) return stored;

    // 2) try URL params (only if storage missing)
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (!email) return null;

    const role = params.get("role") || "user";
    const name = normalizeName(params.get("name"), email);

    const userFromUrl = { name, email, role };
    // persist it so next refresh will keep user
    try { localStorage.setItem("user", JSON.stringify(userFromUrl)); } catch {}
    // cleanup URL
    try {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {}
    return userFromUrl;
  };

  // On mount: initialize user from storage or URL
  useEffect(() => {
    const initial = readAuthFromStorageOrUrl();
    setUser(initial);
  }, []);

  // Keep in sync across tabs and within same tab when we dispatch an event
  useEffect(() => {
    const syncAuth = () => {
      const u = readAuthFromStorageOrUrl();
      setUser(u);
    };

    const storageHandler = (e) => {
      // if storage changed for "user" key, sync
      if (!e || e.key === "user") syncAuth();
    };

    window.addEventListener("storage", storageHandler); // other tabs
    window.addEventListener("auth:changed", syncAuth); // same tab custom event

    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("auth:changed", syncAuth);
    };
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
      window.dispatchEvent(new Event("auth:changed"));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
      console.log(err?.response?.data?.message || err?.message || "Logout failed");
    }
  };

  return (
    <>
      <Toaster />
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-indigo-600">kalvakhy</Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
            <Link to="/" className="hover:text-indigo-500 transition">Home</Link>
            <Link to="/about" className="hover:text-indigo-500 transition">About</Link>
            <Link to="/events" className="hover:text-indigo-500 transition">Events</Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-500 transition"
                >
                  <FaUserCircle size={22} />
                  <span className="hidden sm:inline">{user.name}</span>
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

                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}

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
              <Link to="/" onClick={closeMenu} className="hover:text-indigo-500">Home</Link>
              <Link to="/about" onClick={closeMenu} className="hover:text-indigo-500">About</Link>
              <Link to="/events" className="hover:text-indigo-500 transition">Events</Link>
             

              {user ? (
                <>
                  <Link to="/profile" onClick={closeMenu} className="hover:text-indigo-500">Profile</Link>
                  {user?.role === "admin" && (
                    <Link to="/admin/dashboard" onClick={closeMenu} className="hover:text-indigo-500">Admin Dashboard</Link>
                  )}
                  <button onClick={() => { handleLogout(); closeMenu(); }} className="text-left hover:text-indigo-500">Logout</button>
                </>
              ) : (
                <button onClick={() => { setShowLogin(true); closeMenu(); }} className="text-left hover:text-indigo-500">Login</button>
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
                defaultView="login"
                onSuccess={(u) => {
                  try { localStorage.setItem("user", JSON.stringify(u)); } catch {}
                  setUser(u);
                  setShowLogin(false);
                  window.dispatchEvent(new Event("auth:changed"));
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
