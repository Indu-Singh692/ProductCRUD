// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;