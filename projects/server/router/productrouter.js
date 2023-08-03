
const {productController} = require('../controller')
const { verifyToken } = require('../middleware/auth')
const router = require('express').Router()

const { multerUpload } = require('../midleware/multer')


router.get('/',productController.getProduct)
router.post('/addpro',verifyToken,multerUpload('./assets/productImg', 'product').single('file'), productController.addProduct)


module.exports = router