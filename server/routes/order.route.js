var express = require('express');
var router = express.Router();
let orderController = require("../controllers/orderController");

router.get('/orderdetail', orderController.getInfoOrder)

module.exports = router;