
const productController = require('../controller/productController')
const router = require('express').Router()
const verifyToken = require('../midleware/auth')
const multerUpload = require('../midleware/multer')

router.get('/',productController.getProduct)
router.post('/addpro',verifyToken,multerUpload('./public/product').single(file),productController.addProduct)

