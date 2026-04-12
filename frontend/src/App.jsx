// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <Router>
      {/* Simple header / navbar */}
      <header
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Product App</h2>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="/">Home</Link>
          <Link to="/create-product">Create Product</Link>
        </nav>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;