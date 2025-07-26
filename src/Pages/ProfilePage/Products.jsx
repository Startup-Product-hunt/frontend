import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../Components/Cards/ProductCard";
import ProductDetailModal from "../../Components/Modals/ProductDetailModal";
import ProductEditModel from "../../Components/Modals/ProductEditModel";
import { toast } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/user/profile/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/user/product/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Error deleting product", err);
      toast.error("Failed to delete product");
    }
  };

  // Handle Edit Product Save
  const handleProductUpdate = async (formData) => {
    try {
      await api.put(`/user/product/${editProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated successfully");
      setEditProduct(null);
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Error updating product", err);
      toast.error("Failed to update product");
    }
  };

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.title}
            price={product.price}
            mainImage={product.coverImage}
            onImageClick={() => setSelectedProduct(product)}
            onEdit={() => setEditProduct(product)}
            onDelete={() => handleDeleteProduct(product._id)}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Product Edit Modal */}
      {editProduct && (
        <ProductEditModel
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleProductUpdate}
        />
      )}
    </>
  );
};

export default Products;
