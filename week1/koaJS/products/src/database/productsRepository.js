const fs = require('fs');
const path = require('path');
const { v4 : uuidv4 } = require('uuid')
const sortByCreatedAt = require('../utils/sortByCreatedAt');
const pickFields = require('../utils/pickFields');

const dataPath = path.join(__dirname, 'products.json');

/**
 * Read the list of products from the JSON file.
 * @returns {Array<Object>} The list of products.
 */
function readProducts() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8')).data;
}

/**
 * Write the list of products to the JSON file.
 * @param {Array<Object>} products - The list of products to write.
 */
function writeProducts(products) {
    fs.writeFileSync(dataPath, JSON.stringify({ data: products }, null, 2), 'utf8');
}

/**
 * Get the list of products, with optional limit and sorting.
 * @param {Object} [options]
 * @param {number} [options.limit] - Limit the number of products returned.
 * @param {'asc'|'desc'} [options.orderBy] - Sort order by createdAt.
 * @returns {Array<Object>} The list of products.
 */
function getProducts({limit, orderBy} = {}) {
    let products = readProducts();
    if (orderBy) {
        products = sortByCreatedAt(products, orderBy);
    }

    if (limit) {
        products = products.slice(0, limit);
    }

    return products;
}

/**
 * Get a product by id, optionally selecting specific fields.
 * @param {string} id - The product ID.
 * @param {string} [fields] - Comma-separated list of fields to return.
 * @returns {Object} The product object with selected fields, or throws an error if not found.
 * @throws {Error} If no product with the given ID is found.
 */
function getOne(id, fields) {
    const products = readProducts();
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new Error('Product not found');
    };
    if (fields) {
        return pickFields(product, fields);
    }
    return product;
}

/**
 * Create a new product.
 * @param {Object} product - The product data.
 * @returns {Object} The newly created product with id and createdAt.
 */
function createProduct (product) {
    const products = readProducts();
    const newProduct = {
        id: uuidv4(),
        ...product, 
        createdAt: new Date()
    }
    const newProducts = [...products, newProduct];
    writeProducts(newProducts)
    return newProduct;
}

/**
 * Remove a product by ID.
 * @param {string} id - The product ID.
 * @throws {Error} If no product with the given ID is found.
 */
function removeProduct(id) {
    const products = readProducts();
    const newProducts = products.filter(product => product.id !== id);
    writeProducts(newProducts);
}

/**
 * Update a product by ID.
 * @param {string} id - The product ID.
 * @param {Object} updateData - The data to update.
 * @returns {Object} The updated product.
 * @throws {Error} If no product with the given ID is found.
 */
function updateProduct (id, updateData) {
    const products = readProducts();
    const newProducts = products.map( product => {
        if (product.id !== id) {
            return product;
        }
        return {
            ...product,
            ...updateData,
        };
    });
    const updatedProduct = newProducts.find(product => product.id === id);
    writeProducts(newProducts);
    return updatedProduct;
}

module.exports = {
    getProducts,
    getOne,
    createProduct,
    removeProduct,
    updateProduct
};