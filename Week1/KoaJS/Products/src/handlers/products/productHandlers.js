const { getAll, getOne, getLimit, sortByCreateAt, createProd, removeProd, updatedProd } = require('../../database/productsRepository');

async function getProducts (ctx) {
    try {
        const { limit: numLimit, orderBy: sortBy } = ctx.query;

        let products = getAll();

        if (numLimit !== null || sortBy !== null) {
            if (sortBy) {
                products = sortByCreateAt(products, sortBy);
            }

            if (numLimit) {
                products = getLimit(products, parseInt(numLimit));
            }
        }

        return ctx.body = { 
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

async function getProductById (ctx) {
    try {
        const id = ctx.params.id;
        const fields = ctx.query.fields;
        console.log('id: ', id, 'fields:', fields);
        const product = getOne(id, fields);
        if (product) {
            ctx.status = 200;
            ctx.body = {
                data: product
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                error: 'Product not found'
            }
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        }
    }
}

async function createProduct (ctx) {
    try {
        const productData = ctx.request.body;
        const newProduct = createProd(productData);
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

async function deleteProduct (ctx) {
    try {
        const id = ctx.params.id;
        console.log('Deleting product with id:', id);
        const isDeleted = removeProd(id);
        if (isDeleted) {
            ctx.status = 204;
            console.log('Product deleted successfully', isDeleted);
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        }
    }
}

async function updateProduct (ctx) {
    try {
        const id = ctx.params.id;
        const productData = ctx.request.body;
        console.log('Updating product with id:', id, 'Data:', productData);
        
        const updatedProduct = updatedProd(id, productData);
        if (updatedProduct) {
            ctx.body = {
                success: true,
                data: updatedProduct
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                error: 'Product not found'
            }
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        }
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}