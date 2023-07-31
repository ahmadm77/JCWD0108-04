const express = require('express');
const useController = require('../controller/userController');
const transController = require('../controller/transaction');
const router = express.Router();

router.get('/homee', useController.greet);
router.patch('/transaction', transController.checkOut);

module.exports = router;