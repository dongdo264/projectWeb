var express = require('express');
var router = express.Router();
let customerController = require("../controllers/customerController");

router.get('/orderdetail', orderController.getInfoOrder);
router.post('/transferproducts', orderController.transferProducts);

module.exports = router;