const Router = require('koa-router');
const productHandlers = require('../handlers/products/productHandlers.js');
const { productInputMiddleware } = require('../middleware/productInputMiddleware.js');

const router = new Router();

router.get('/api/products', productHandlers.getProducts);
router.get('/api/product/:id', productHandlers.getProductById);
router.post('/api/products', productInputMiddleware,productHandlers.createProduct);
router.delete('/api/product/:id', productHandlers.deleteProduct);
router.put('/api/product/:id', productInputMiddleware, productHandlers.updateProduct);

module.exports = router;