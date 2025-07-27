import { useEffect, useState } from "react";
import ForYouCard from "../../Components/Cards/ForYouCard";
import api from "../../api/axios";
import Layout from "../../Components/Layout/Layout";
import { CiSearch } from "react-icons/ci";

const ForYouAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/general/products");
        const allProducts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(allProducts);
        setFilteredProducts(allProducts);
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
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  return (
    <Layout>
      <div className="bg-blue-950 text-white px-4 md:px-32 py-8 md:py-12 min-h-[100vh]">
        <p className="text-center text-4xl font-bold mb-6">All Products</p>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-300"
            />
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="col-span-4 text-center text-gray-300">Loading...</p>
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
            <p className="col-span-4 text-center text-gray-300">
              No products found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForYouAllProducts;
