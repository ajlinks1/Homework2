const Express = require('express');
const BodyParser = require('body-parser');

const productContoller = require('../controllers/controller_products');

const router = Express.Router();

router.use(BodyParser.json());

router.get('/product', productContoller.getProducts);
router.get('/product/:sku', productContoller.getProductsSku);
router.post('/product', productContoller.postProducts);
router.delete('/product', productContoller.deleteProducts);
router.delete('/product/:sku', productContoller.deleteProductsSku);
router.put('/product/:sku', productContoller.putProducts);
router.patch('/product/:sku', productContoller.patchProducts);

module.exports = router;
