const express = require('express');
const transController = require('../controller/transaction');
const { multerUpload } = require('../midleware/multer');
const { verifyToken } = require('../midleware/auth');
const userController = require('../controller/userController');
const { vLogin } = require('../middleware/login');


const router = express.Router();

router.post('/login',vLogin ,userController.login);
router.patch('/transaction', transController.checkOut);
router.post('/chFP', verifyToken, multerUpload('./assets/profileImg', 'profile').single('file') , userController.changeProfile);
router.get('/products', userController.getProducts);
router.get('/categories', userController.getCategories);


module.exports = router;