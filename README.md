# Product CRUD Application

A full-stack product management application with a Node.js backend and React frontend.

## Project Structure

```
├── backend/          # Node.js Express server
│   ├── controllers/  # Business logic
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   ├── data/         # Data storage
│   └── utils/        # Utility functions
└── frontend/         # React Vite application
    ├── src/          # React components
    └── public/       # Static assets
```

## Backend Features

- RESTful API for product management
- File upload for product images
- Search, filter, and sort functionality
- Pagination support
- JSON file-based data storage

## Frontend Features

- Modern React interface
- Product listing with grid layout
- Search and filtering
- Add/Edit/Delete products
- Image upload support
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone or download the project

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The backend will run on http://localhost:5001

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

3. Open your browser and navigate to http://localhost:5173

## API Documentation

### Products Endpoints

- `GET /api/products` - Get all products (supports query parameters: search, category, brand, sort, page, limit)
- `POST /api/products` - Create a new product (multipart/form-data)
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Product Schema

```json
{
  "id": "number",
  "name": "string",
  "price": "number",
  "category": "string",
  "brand": "string",
  "variant": "string",
  "image": "string" // filename
}
```

## Technologies Used

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- CORS

### Frontend
- React 19
- Vite
- Axios
- CSS

## Development

- Backend uses nodemon for auto-restart
- Frontend uses Vite for fast development
- API proxy configured for seamless development