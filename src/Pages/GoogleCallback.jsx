import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);

    // read values your backend put in the URL
    const name  = search.get("name");
    const email = search.get("email");
    const role  = search.get("role");
    // optional but recommended
    const token = search.get("token"); // e.g., JWT if you return it

    if (name && email && role) {
      const user = { name, email, role };
      localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);

      toast.success(`Welcome ${name}`);
      navigate("/", { replace: true });
    } else {
      toast.error("Google login failed");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-[50vh] grid place-items-center text-gray-700">
      Logging you in with Google...
    </div>
  );
}
