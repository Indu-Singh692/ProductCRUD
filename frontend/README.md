# Product Management Frontend

A React application built with Vite for managing products. This frontend connects to a Node.js backend API to perform CRUD operations on products.

## Features

- View all products in a grid layout
- Search products by name
- Filter by category and brand
- Sort by name or price
- Add new products with image upload
- Edit existing products
- Delete products
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend server running on http://localhost:5001

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Backend Setup

Make sure the backend server is running on port 5001. The frontend is configured to proxy API requests to the backend.

To start the backend:
```bash
cd backend
npm install
npm start
```

## API Endpoints

The frontend interacts with the following backend endpoints:

- `GET /api/products` - Fetch products with optional query parameters
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update an existing product
- `DELETE /api/products/:id` - Delete a product

## Technologies Used

- React 19
- Vite
- Axios for API calls
- CSS for styling
