const express = require('express');

const router = express.Router();

const{
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');
const upload = require('../middleware/upload');

router.get('/products',getProduct);
router.post('/products',upload.single('image'),createProduct);
router.put('/products/:id',upload.single('image'),updateProduct);
router.delete('/products/:id',deleteProduct);

module.exports = router;