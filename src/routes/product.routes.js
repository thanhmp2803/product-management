const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Get all products
router.get('/', productController.getAllProducts);

// Create product form
router.get('/create', productController.createProductForm);

// Create product
router.post('/', productController.createProduct);

// Edit product form
router.get('/edit/:id', productController.editProductForm);

// Update product
router.post('/update/:id', productController.updateProduct);

// Delete product
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;