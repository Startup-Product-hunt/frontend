import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Error from "./Pages/Error";
import Profile from "./Pages/ProfilePage/Profile";
import Event from "./Pages/EventPages/Event";
import Header from "./Components/Layout/Header";
import ForYouAllProducts from "./Pages/AllProducts/ForYouAllProducts";
import AdminPage from "./Pages/AdminDashboard/AdminPage";
import AllUser from "./Pages/AdminDashboard/AllUser";
import AllCreatedTickets from "./Pages/AdminDashboard/AllCreatedTickets";
import GoogleCallback from "./Pages/GoogleCallback";
import ResetPasswordPage from "./Pages/ProfilePage/ResetPasswordPage";

//testing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* general */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />
    
        {/* User */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:token" element={<ResetPasswordPage />} />

       
        {/* admin */}
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/admin/users" element={<AllUser />} />
        <Route path="/admin/tickets" element={<AllCreatedTickets />} />

        {/* general */}
        <Route path="/for-you/all" element={<ForYouAllProducts />} />
        <Route path="/events" element={<Event />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
