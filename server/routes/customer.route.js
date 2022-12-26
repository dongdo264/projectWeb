var express = require('express');
var router = express.Router();
let customerController = require('../controllers/customerController')

router.get('/customer/:id', customerController.getCustomerById)
router.put('/customer/:id', customerController.updateCustomer);

module.exports = router;