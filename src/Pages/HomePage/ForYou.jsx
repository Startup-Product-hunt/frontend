import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md"; // Icon for no products
import ForYouCard from "../../Components/Cards/ForYouCard";
import api from "../../api/axios";

const ForYou = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/general/products");

        const latestProducts = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setProducts(latestProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Set loading to false when request completes
      }
    };

    fetchProducts();
  }, []);

  const handleSeeMore = () => {
    navigate("/for-you/all");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mt-10 mb-6">
        <p className="font-semibold text-3xl">For You</p>
        <button
          onClick={handleSeeMore}
          className="flex items-center gap-1 hover:text-gray-200 cursor-pointer font-medium text-sm transition"
        >
          See More <IoIosArrowForward />
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-4 flex justify-center items-center min-h-[100px]">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ForYouCard
              key={product._id}
              title={product.title}
              description={product.details}
              profileName={product.userId?.name || "Unknown"}
              mainImage={product.coverImage}
              profileImage={product.userId?.profilePic}
              category={product.category}
              price={product.price}
            />
          ))
        ) : (
          <div className="col-span-4 flex flex-col items-center text-gray-400">
            <MdOutlineShoppingCart size={50} />
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForYou;
