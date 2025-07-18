import React, { useState } from "react";

const LoginModal = () => {
  const [view, setView] = useState("login"); // login | signup | forgot

  const renderLogin = () => (
    <>
      <p className="text-2xl font-bold mb-3 text-center">Login</p>
      <p className="text-center text-sm mb-4 text-gray-500">
        Don’t have an account?{" "}
        <button className="text-blue-600" onClick={() => setView("signup")}>
          Register now
        </button>
      </p>
      <input type="email" placeholder="Email" className="input mb-3" />
      <input type="password" placeholder="Password" className="input mb-4" />
      <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3 transition-all duration-300 cursor-pointer">
        Login
      </button>

      <div className="mt-0 flex justify-end">
        <button
          className="text-blue-600 text-sm"
          onClick={() => setView("forgot")}
        >
          Forgot Password?
        </button>
      </div>
    </>
  );

  const renderSignup = () => (
    <>
      <p className="text-2xl font-bold mb-3 text-center">Sign Up</p>
      <input type="text" placeholder="Full Name" className="input mb-3" />
      <input type="email" placeholder="Email" className="input mb-3" />
      <input type="password" placeholder="Password" className="input mb-4" />
      <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3 transition-all duration-300 =">
        SignUp
      </button>
      <div className="text-sm text-center text-gray-600">
        <p>
          Already have an account?{" "}
          <button
            className="text-blue-600 cursor-pointer"
            onClick={() => setView("login")}
          >
            Login
          </button>
        </p>
      </div>
    </>
  );

  const renderForgot = () => (
    <>
      <p className="text-lg font-medium mb-3 text-center">
        Enter your email, we'll send you password reset link
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="input mb-4"
      />
      <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3 transition-all duration-300 =">
        Send Link
      </button>
<div className="mt-0 flex justify-center">
      <button
        className="text-blue-600 text-sm"
        onClick={() => setView("login")}
      >
        Back to Login
      </button>
      </div>
    </>
  );

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg mx-auto mt-10">
      {view === "login" && renderLogin()}
      {view === "signup" && renderSignup()}
      {view === "forgot" && renderForgot()}
    </div>
  );
};

export default LoginModal;
