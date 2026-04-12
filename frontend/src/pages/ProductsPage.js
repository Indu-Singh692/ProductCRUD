import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../services/api";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [layoutMode, setLayoutMode] = useState("grid");
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({
        search,
        category,
        brand,
        sort,
        order,
        page,
        limit,
      });

      setProducts(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search, category, brand, sort, order, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await deleteProduct(id);
    getProducts();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setLayoutMode("grid")}>Grid</button>
      <button onClick={() => setLayoutMode("list")}>List</button>

      <div
        style={{
          display: layoutMode === "grid" ? "grid" : "flex",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} product={p} onDelete={handleDelete} />
          ))
        )}
      </div>

      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span>{page}</span>
      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default ProductsPage;