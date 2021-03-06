const Express = require('express');
const BodyParser = require('body-parser');

const productController = require('../controllers/controller_products');

const router = Express.Router();

router.use(BodyParser.json());

router.get('/products', productController.getProducts);
router.get('/products/:sku', productController.getProductsSku);
router.post('/products', productController.postProducts);
router.delete('/products', productController.deleteProducts);
router.delete('/products/:sku', productController.deleteProductsSku);
router.put('/products/:sku', productController.putProducts);
router.patch('/products/:sku', productController.patchProducts);

module.exports = router;
