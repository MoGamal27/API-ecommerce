const express = require('express')
const product = require('../controller/productController')
const checkRole = require('../middleware/chekRole')
const {verifyJwt} = require('../middleware/verifyJwt')
const router = express.Router();

router.post('/products',verifyJwt,checkRole(['admin']),product.createNewProduct)
router.get('/products',verifyJwt,product.getAllProducts)
router.get('/products/:id',verifyJwt,product.getOneProduct)
router.put('/products/:id',verifyJwt,checkRole(['admin']),product.UpdateProducts)
router.delete('/products/:id',verifyJwt,checkRole(['admin']),product.deleteProudcts)

module.exports = router;