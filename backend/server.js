const express = require('express');
const app = express();

const productRoutes = require('./routes/productRoutes');
app.use(express.json());

app.use('/api',productRoutes);
app.use('/uploads',express.static('uploads'));

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");
})