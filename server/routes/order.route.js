var express = require('express');
var router = express.Router();
let orderController = require("../controllers/orderController");

//Tạo đơn hàng
router.post("/order", orderController.order);
//Lấy đơn hàng theo id
router.get('/order/:id', orderController.getInfoOrder);
//Chuyển sản phẩm từ nhà máy đến đại lý
router.post('/transferproducts', orderController.transferProducts);

module.exports = router;