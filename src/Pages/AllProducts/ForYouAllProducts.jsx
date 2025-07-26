import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ForYouCard from "../../Components/Cards/ForYouCard";
import api from "../../api/axios";
import Layout from "../../Components/Layout/Layout";

const ForYouAllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/general/products");
        const allProducts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="bg-blue-950 text-white px-4 md:px-32 py-8 md:py-12">
        <p className="text-center text-4xl font-bold mb-10">All Products</p>
        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
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
            <p className="col-span-4 text-center text-gray-400">Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForYouAllProducts;
