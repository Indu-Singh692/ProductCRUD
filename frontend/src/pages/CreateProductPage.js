// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import ProductList from "../components/ProductList";
// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [view, setView] = useState("grid");

// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [brand, setBrand] = useState("");
// //   const [sort, setSort] = useState("");

//   const [page, setPage] = useState(1);
// //   const limit = 4;

//   // ✅ Fetch Products
//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/products", {
//     //   params: {
//     //     search,
//     //     category,
//     //     brand,
//     //     sort,
//     //     page,
//     //     limit
//     //   }
//     });
//       console.log("API RESPONSE 👉", res.data); // 👈 MUST ADD

//     setProducts(res.data.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ✅ Delete
//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h2>All Products</h2>

//       {/* 🔍 Search
//       <input
//         type="text"
//         placeholder="Search..."
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setPage(1);
//         }}
//       /> */}

//       {/* 🔄 Toggle */}
//       <button onClick={() => setView("grid")}>Grid View</button>
//       <button onClick={() => setView("list")}>List View</button>
// {/* 
//       🎯 Filter
//       <select onChange={(e) => {
//         setCategory(e.target.value);
//         setPage(1);
//       }}>
//         <option value="">All Categories</option>
//        <option value="electronic">Electronic</option>
// <option value="Fruits">Fruits</option>
// <option value="electronocs">electronocs</option>
//       </select>

//       <select onChange={(e) => {
//         setBrand(e.target.value);
//         setPage(1);
//       }}>
//         <option value="">All Brands</option>
//         <option value="Apple">Apple</option>
//         <option value="Samsung">Samsung</option>
//       </select> */}

//       {/* 🔃 Sorting 
//       <select onChange={(e) => {
//         setSort(e.target.value);
//         setPage(1);
//       }}>
//         <option value="">Sort</option>
//         <option value="price">Price</option>
//         <option value="name">Name</option>
//       </select>*/}

//       {/* 📦 Products */}
//       <ProductList 
//   products={products} 
//   view={view} 
//   onDelete={handleDelete} 
// />

//       {/* 📄 Pagination */}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//           Prev
//         </button>

//         <span> Page {page} </span>

//         <button onClick={() => setPage(page + 1)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/pages/CreateProductPage.js

import React, { useState } from "react";
import axios from "axios";

function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    variant: ""
  });

  const [image, setImage] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("variant", form.variant);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      alert(res.data.message);

      // reset form
      setForm({
        name: "",
        price: "",
        category: "",
        brand: "",
        variant: ""
      });
      setImage(null);

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />

        <input
          type="text"
          name="variant"
          placeholder="Variant"
          value={form.variant}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default CreateProductPage;