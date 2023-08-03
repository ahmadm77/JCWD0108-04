const express = require('express');
const useController = require('../controller/userController');
const transController = require('../controller/transaction');
const { multerUpload } = require('../midleware/multer');
const { verifyToken } = require('../midleware/auth');
const router = express.Router();

router.get('/homee', useController.greet);
router.patch('/transaction', transController.checkOut);
router.post('/chFP', verifyToken, multerUpload('./public/Profile', 'profile').single('file') , useController.changeProfile);


module.exports = router;