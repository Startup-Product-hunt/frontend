import  { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Loading from "../Atoms/Loading";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onSuccess, defaultView = "login", resetToken = "" }) => {
  const [view, setView] = useState(defaultView);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (resetToken) {
      setView("reset"); 
    }
  }, [resetToken]);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setNewPassword("");
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/auth/register`, { name, email, password });
      toast.success("Registered successfully");
      setView("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  const handleLogin = async () => {

    if(!email || !password){
      toast.error("Email and password is required!")
      return
    }
    setLoading(true);
    try {
      const res = await api.post(`/auth/login`, { email, password });

      const userData = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Welcome back " + res.data.name);
      onSuccess?.(userData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      resetFields();
      setLoading(false);
      setTimeout(() => {
        navigate('/profile')
      }, 10);
    }
  };

  // Forgot Password with Reset Link
  const handleSendResetLink = async () => {
    setLoading(true);
    try {
      await api.post(`/auth/forgot-password`, { email });
      toast.success("Reset link sent to your email");
      setView("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      resetFields();
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${resetToken}`, {
        newPassword: newPassword,
      });
      toast.success("Password reset successful");
      setView("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
      console.log("error: " ,err)
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
        Enter your email to receive a reset link
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
        onClick={handleSendResetLink}
        disabled={loading}
      >
        {loading ? <Loading /> : "Send Reset Link"}
      </button>

      <div className="text-center text-sm">
        <button className="text-blue-600" onClick={() => setView("login")}>
          Back to Login
        </button>
      </div>
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
        {loading ? <Loading /> : "Set New Password"}
      </button>
    </>
  );

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg mx-auto mt-10">
      {view === "login" && renderLogin()}
      {view === "signup" && renderSignup()}
      {view === "forgot" && renderForgot()}
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
