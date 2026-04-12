// import React from "react";

// const ProductCards = ({product, onDelete, view})=>{

//     return(
// <div className={view === "grid" ? "card" : "list-card"}>
//     {/**Image */}
//     <img
//     src={`http://localhost:5000/uploads/${product.image}`}
//     alt="product"
//     width="120"
//     />
   
//    {/**Info */}
//    <div>
//     <h3>{product.name}</h3>
//     <p>₹ {product.price}</p>
//     <p>{product.brand}</p>
//     <p>{product.category}</p>
//     <p>{product.variant}</p>
//    </div>
    

//     {/**Delete */}
// <button onClick={() => onDelete(product.id)}>Delete</button>
// </div>

//     );
// };

// export default ProductCards;


// src/components/ProductCard.js
import React from "react";

function ProductCard({ product, layoutMode, onDelete }) {
  const { id, name, price, category, brand, image } = product;

  const containerStyle = {
    border: "1px solid #ccc",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    ...(layoutMode === "grid"
      ? { flexDirection: "column", alignItems: "center" }
      : {}),
    gap: "8px",
    minWidth: layoutMode === "grid" ? "200px" : "auto",
  };

  const imgStyle = {
    width: layoutMode === "grid" ? "120px" : "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "4px",
  };

  return (
    <div style={containerStyle}>
      {image && (
        <img
          src={`/uploads/${image}`}
          alt={name}
          style={imgStyle}
        />
      )}
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 4px 0" }}>{name}</h3>
        <p style={{ margin: "0 0 4px 0" }}>₹{price}</p>
        <p style={{ margin: "0 0 4px 0" }}>
          <strong>Category:</strong> {category}
        </p>
        <p style={{ margin: "0 0 4px 0" }}>
          <strong>Brand:</strong> {brand}
        </p>
      </div>

      <div style={{ display: "flex", gap: "5px", marginTop: "auto" }}>
        <button>Edit</button> {/* You can route to an edit page later */}
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default ProductCard;