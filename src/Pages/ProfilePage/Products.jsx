import React from "react";
import img from "/images/demo.jpeg";
import ProductCard from "../../Components/Cards/ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard name="Beige Sweater" price="100" mainImage={img} />
    </div>
  );
};

export default Products;
