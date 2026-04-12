// src/components/ProductList.js
import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, layoutMode, onDelete }) {
  return (
    <div
      style={{
        display: layoutMode === "grid" ? "grid" : "flex",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "15px",
        flexDirection: layoutMode === "list" ? "column" : "row",
        flexWrap: "wrap",
      }}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          layoutMode={layoutMode}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;