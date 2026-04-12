// src/components/ProductForm.js
import React from "react";

function ProductForm({ formData, setFormData, image, setImage, onSubmit, submitLabel = "Submit", errors = {} }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Price *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.price && <small style={{ color: "red" }}>{errors.price}</small>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Category *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.category && <small style={{ color: "red" }}>{errors.category}</small>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Brand *</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.brand && <small style={{ color: "red" }}>{errors.brand}</small>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Variants (JSON string)</label>
        <textarea
          name="variant"
          value={formData.variant}
          onChange={handleChange}
          style={{ width: "100%", height: "60px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <p style={{ fontSize: "12px" }}>Selected: {image.name}</p>}
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default ProductForm;