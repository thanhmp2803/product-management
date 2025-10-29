const Product = require('../models/product.model');

// Get all products and handle search
exports.getAllProducts = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const searchRegex = new RegExp(searchQuery, 'i');

        const products = await Product.find({
            $or: [
                { name: searchRegex },
                { category: searchRegex },
                { description: searchRegex }
            ]
        });

        res.render('products/index', { 
            products,
            searchQuery
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Show create product form
exports.createProductForm = (req, res) => {
    res.render('products/create');
};

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/products');
    } catch (error) {
        res.render('products/create', { error });
    }
};

// Show edit product form
exports.editProductForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('products/edit', { product });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error });
    }
};