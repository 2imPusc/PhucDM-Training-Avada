const { 
    getProducts: getProductsRepo, 
    getOne, 
    createProduct: createProductRepo, 
    removeProduct: removeProductRepo, 
    updateProduct: updateProductRepo 
} = require('../../database/productsRepository');


/**
 * Get the list of all products and return via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the list of products.
 */
async function getProducts (ctx) {
    try {
        const { limit , orderBy } = ctx.query;

        const products = getProductsRepo({ limit, orderBy });

        ctx.body = { 
            data: products 
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        };
    }
}

/**
 * Get a product by id (with optional fields) and return via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the product data or an error if not found.
 */
async function getProductById (ctx) {
    try {
        const id = ctx.params.id;
        const fields = ctx.query.fields;
        console.log('id: ', id, 'fields:', fields);
        const product = getOne(id, fields);

        ctx.status = 200;
        ctx.body = {
            data: product
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        }
    }
}

/**
 * Create a new product and return it via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the newly created product.
 */
async function createProduct (ctx) {
    try {
        const productData = ctx.request.body;
        const newProduct = createProductRepo(productData);
        ctx.body = {
            success: true,
            data: newProduct
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        }
    }
}

/**
 * Delete a product by id and return confirmation via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response confirming deletion or an error if not found.
 */
async function deleteProduct (ctx) {
    try {
        const id = ctx.params.id;
        removeProductRepo(id);
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Product deleted successfully"
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        }
    }
}

/**
 * Update a product by id and return the updated product via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the updated product or an error if not found.
 */
async function updateProduct (ctx) {
    try {
        const id = ctx.params.id;
        const productData = ctx.request.body;        
        const updatedProduct = updateProductRepo(id, productData);
        ctx.body = {
            success: true,
            data: updatedProduct
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        };
    };
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}