const express = require('express');
const bodyParser = require('body-parser');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('./products'); // Assuming you named the file with CRUD operations as 'products.js'

const app = express();
const port = 3000; // You can change this to any port you prefer

app.use(bodyParser.json());

// Get all products
app.get('/api/products', (req, res) => {
    getAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(products);
    });
});

// Get a product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    getProductById(productId, (err, product) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    });
});

// Create a new product
app.post('/api/products', (req, res) => {
    const { name, description, price } = req.body;
    createProduct(name, description, price, (err, productId) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ id: productId, message: 'Product created successfully' });
    });
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price } = req.body;
    updateProduct(productId, name, description, price, (err) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Product updated successfully' });
    });
});

// Patch a product by ID
app.patch('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price } = req.body;
    updateProduct(productId, name, description, price, (err) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Product updated successfully' });
    });
});


// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    deleteProduct(productId, (err) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
