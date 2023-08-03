
const productController = require('../controller/productController')
const { multerUpload } = require('../midleware/multer')
const router = require('express').Router()
const verifyToken = require('../midleware/auth')


router.get('/',productController.getProduct)
router.post('/addpro',verifyToken, multerUpload('./public/product', 'product').single('file'), productController.addProduct)


module.exports = router