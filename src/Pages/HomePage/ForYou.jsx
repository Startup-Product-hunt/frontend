import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import ForYouCard from "../../Components/Cards/ForYouCard";
import api from "../../api/axios";

const ForYou = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/general/products");
        const latestProducts = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setProducts(latestProducts);
        setFilteredProducts(latestProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts(products);
    } else {
      const searchLower = search.toLowerCase();
      const filtered = products
        .filter(
          (product) =>
            product.title.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
        )
        .slice(0, 4);
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  const handleSeeMore = () => {
    navigate("/for-you/all");
  };

  return (
    <div className="px-6 min-h-[70vh]">
      

      {/* Search Section */}
      <div className="flex flex-col items-center ">
        <p className="text-xl font-bold text-white mb-3 text-center">
           Search for products you love
        </p>
        <div className="relative w-full max-w-md">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* See More Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSeeMore}
          className="flex items-center gap-1 hover:text-gray-600 cursor-pointer font-medium text-sm transition"
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
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          <div className="col-span-4 flex flex-col justify-center items-center text-gray-200">
            <MdOutlineShoppingCart size={50} />
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForYou;
