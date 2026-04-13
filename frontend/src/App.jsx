import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    variant: '',
    image: null
  })
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [search, category, brand, sort])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (category) params.append('category', category)
      if (brand) params.append('brand', brand)
      if (sort) params.append('sort', sort)

      const response = await axios.get(`/api/products?${params}`)
      setProducts(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', formData.name)
    data.append('price', formData.price)
    data.append('category', formData.category)
    data.append('brand', formData.brand)
    data.append('variant', formData.variant)
    if (formData.image) {
      data.append('image', formData.image)
    }

    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await axios.post('/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      fetchProducts()
      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`)
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      brand: product.brand,
      variant: product.variant,
      image: null
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      price: '',
      category: '',
      brand: '',
      variant: '',
      image: null
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }))
  }

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading amazing products...</p>
    </div>
  )

  return (
    <div className="app">
      {/* Amazon-style Header */}
      <header className="amazon-header">
        <div className="header-container">
          <div className="logo">
            <h1>🛍️ ProductHub</h1>
            <span className="logo-tagline">Manage your store</span>
          </div>
          <button 
            className="add-product-btn"
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
          >
            {showForm ? '✕ Close' : '+ Add Product'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2>Product Management Dashboard</h2>
          <p>Manage your inventory like a pro</p>
        </div>
      </div>

      <div className="main-container">
        {/* Filters Section - Amazon Style */}
        <div className="filters-section">
          <div className="filters-header">
            <h3>🔍 Filter & Sort Products</h3>
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Brand</label>
              <input
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Sort By</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Default</option>
                <option value="name">Name A-Z</option>
                <option value="-name">Name Z-A</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
                <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., iPhone 15 Pro"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Price *</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="e.g., Electronics"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="e.g., Apple"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Variant</label>
                    <input
                      type="text"
                      name="variant"
                      placeholder="e.g., 256GB Blue"
                      value={formData.variant}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Product Image</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      id="file-input"
                    />
                    <label htmlFor="file-input" className="file-label">
                      📁 Choose Image
                    </label>
                    {formData.image && <span className="file-name">{formData.image.name}</span>}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button type="button" onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Grid - Amazon Style */}
        <div className="products-section">
          <div className="products-header">
            <h3>📦 Our Products</h3>
            <span className="product-count">{products.length} products found</span>
          </div>
          
          {products.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button onClick={() => {
                setSearch('')
                setCategory('')
                setBrand('')
                setSort('')
              }} className="clear-filters-btn">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    {product.image ? (
                      <img 
                        src={`http://localhost:5001/uploads/${product.image}`} 
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        🖼️ No Image
                      </div>
                    )}
                    <div className="product-actions">
                      <button onClick={() => handleEdit(product)} className="action-btn edit-btn">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="action-btn delete-btn">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-price">${parseFloat(product.price).toFixed(2)}</div>
                    
                    <div className="product-meta">
                      <span className="meta-tag category-tag">
                        📁 {product.category}
                      </span>
                      <span className="meta-tag brand-tag">
                        🏷️ {product.brand}
                      </span>
                    </div>
                    
                    {product.variant && (
                      <div className="product-variant">
                        <span className="variant-label">Variant:</span>
                        <span className="variant-value">{product.variant}</span>
                      </div>
                    )}
                    
                    <div className="product-rating">
                      <span className="stars">★★★★☆</span>
                      <span className="rating-count">(4.2)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App