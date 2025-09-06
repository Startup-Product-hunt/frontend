import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import ProductCard from "../../Components/Cards/ProductCard";
import { toast } from "react-hot-toast";

const ProductBYUserId = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/general/productByUserId/${userId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
          No products added
        </div>
      ) : (
        // Products Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              name={product.title}
              price={product.price}
              mainImage={product.coverImage}
              onImageClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductBYUserId;
