const express = require('express');
const adminController = require('../controller/adminController');
const { vRegis } = require('../middleware/register');
const { multerUpload } = require('../middleware/multer');
const router = express.Router();

router.post('/register',vRegis,adminController.register);
router.post('/addProduct',multerUpload('./assets/productImg','product').single('file'),adminController.addProduct);

module.exports = router;