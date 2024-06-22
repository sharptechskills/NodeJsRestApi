const db = require('./db');

// Create a new product
function createProduct(name, description, price, callback) {
    const sql = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
    db.query(sql, [name, description, price], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result.insertId);
    });
}

// Retrieve all products
function getAllProducts(callback) {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// Retrieve a product by ID
function getProductById(id, callback) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // Product not found
            return;
        }
        callback(null, result[0]);
    });
}

// Update a product by ID
function updateProduct(id, name, description, price, callback) {
    let updateFields = [];
    if (name) updateFields.push('name = ?');
    if (description) updateFields.push('description = ?');
    if (price) updateFields.push('price = ?');

    if (updateFields.length === 0) {
        callback(new Error('No fields to update'));
        return;
    }

    const sql = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
    const values = [...(name ? [name] : []), ...(description ? [description] : []), ...(price ? [price] : []), id];

    db.query(sql, values, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, the product with the given ID was not found
            callback(new Error('Product not found'));
            return;
        }
        callback(null);
    });
}


// Delete a product by ID
function deleteProduct(id, callback) {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
