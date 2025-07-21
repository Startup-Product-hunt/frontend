import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Loading from "../Atoms/Loading";

const LoginModal = ({ onSuccess }) => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const resetFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setOtp("");
    setResetToken("");
    setNewPassword("");
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/auth/register`, { name, email, password });
      toast.success("Registered successfully");
      console.log("Registered " + res.data.name);
      setView("login");
    } catch (err) {
      console.log(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/auth/login`, { email, password });

      // Extracting user data from response
      const userData = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      };

      // Store in localStorage as string
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Welcome back " + res.data.name);
      onSuccess?.(userData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.log(err.response?.data?.message || "Login failed");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await api.post(`/auth/forgot-password`, { email });
      toast.success("OTP sent");
      setView("verifyOtp");
    } catch (err) {
      toast.error("Failed to send OTP");
      console.log(err.response?.data?.message || "Failed to send OTP");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/auth/verify-otp`, { email, otp });
      toast.success("OTP verified");
      setResetToken(res.data.resetToken);
      setView("reset");
    } catch (err) {
      toast.error("OTP verification failed");
      console.log(err.response?.data?.message || "OTP verification failed");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await api.post(`/auth/reset-password`, {
        email,
        resetToken,
        newPassword,
      });
      toast.success("Password reset successful");
      setView("login");
    } catch (err) {
      toast.error("Password reset failed");
      console.log(err.response?.data?.message || "Password reset failed");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  const renderLogin = () => (
    <>
      <p className="text-2xl font-bold mb-3 text-center">Login</p>
      <input
        type="email"
        placeholder="Email"
        className="input mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <Loading /> : " Login"}
      </button>

      <div className="text-right text-sm">
        <button className="text-blue-600" onClick={() => setView("forgot")}>
          Forgot Password?
        </button>
      </div>
    </>
  );

  const renderSignup = () => (
    <>
      <p className="text-2xl font-bold mb-3 text-center">Sign Up</p>
      <input
        type="text"
        placeholder="Full Name"
        className="input mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="input mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? <Loading /> : "Sign Up "}
      </button>
    </>
  );

  const renderForgot = () => (
    <>
      <p className="text-lg font-medium mb-3 text-center">
        Enter your email to get an OTP
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="input mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3"
        onClick={handleSendOtp}
        disabled={loading}
      >
        {" "}
        {loading ? <Loading /> : "Send OTP"}
      </button>

      <div className="text-center text-sm">
        <button className="text-blue-600" onClick={() => setView("login")}>
          Back to Login
        </button>
      </div>
    </>
  );

  const renderVerifyOtp = () => (
    <>
      <p className="text-lg font-medium mb-3 text-center">
        Enter OTP sent to {email}
      </p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="input mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3"
        onClick={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? <Loading /> : " Verify OTP"}
      </button>
    </>
  );

  const renderReset = () => (
    <>
      <p className="text-lg font-medium mb-3 text-center">
        Reset your password
      </p>
      <input
        type="password"
        placeholder="New Password"
        className="input mb-4"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 mb-3"
        onClick={handleResetPassword}
        disabled={loading}
      >
        {" "}
        {loading ? <Loading /> : " Set New Password"}
      </button>
    </>
  );

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg mx-auto mt-10">
      {view === "login" && renderLogin()}
      {view === "signup" && renderSignup()}
      {view === "forgot" && renderForgot()}
      {view === "verifyOtp" && renderVerifyOtp()}
      {view === "reset" && renderReset()}

      {(view === "login" || view === "signup") && (
        <>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
        </>
      )}

      <div className="text-sm text-center mt-4 text-gray-600">
        {(view === "login" || view === "signup") && (
          <div className="text-sm text-center mt-4 text-gray-600">
            {view === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  className="text-blue-600"
                  onClick={() => setView("signup")}
                >
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  className="text-blue-600"
                  onClick={() => setView("login")}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
