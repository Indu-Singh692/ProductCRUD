const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS (frontend connect)
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

// Static folder for images
app.use('/uploads', express.static('uploads'));

// Use PORT from .env
const PORT = process.env.PORT||5000 ;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.BACKEND_URL}`);
});