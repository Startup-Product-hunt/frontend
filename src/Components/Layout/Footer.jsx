import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-200 py-8 ">
      {/* Top Section */}
      <p className="text-3xl font-bold ms-20 mb-3">kalvakhy</p>
      <div className="container mx-auto px-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-6">
        
        {/* Left - Contact Info */}
        <div className="text-gray-700 text-sm space-y-2 text-center md:text-left">
          
          <p>Email: support@kalvakhy.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123, Example Street, India</p>
        </div>

        {/* Middle - Social Media */}
        <div className=" space-x-4 text-gray-700 ">
          <p className="text-xl font-semibold">Follow us on </p>
          <div className="flex gap-4 mt-3">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-500">
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-500">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Right - Scroll to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-3 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
        © {new Date().getFullYear()} kalvakhy. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
