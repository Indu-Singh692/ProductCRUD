// import axios from 'axios';


// const API = axios.create({
//     baseURL:"http://localhost:5000/api"
// });

// export const getProduct = (params)=>API.get("/products",{params});
// export const addProduct = (data)=> API.post('/products',data);
// export const updateProduct = (id,data) => API.put(`/products/${id}`,data);
// export const deleteProduct = (id) => API.delete(`/products${id}`);

import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // change if needed

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = (params) => {
  return api.get("/products", { params });
};

export const createProduct = (formData) => {
  return api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};