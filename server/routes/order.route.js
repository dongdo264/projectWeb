var express = require('express');
var router = express.Router();
let orderController = require("../controllers/orderController");

//Đại lý lấy đơn hàng
router.get("/orders", orderController.getAllOrders);
//Tạo đơn hàng
router.post("/order", orderController.order);
//Cập nhật trạng thái đơn hàng
router.put("/order/:orderNumber", orderController.updateOrder)
//Lấy đơn hàng theo id
router.get('/order/:id', orderController.getInfoOrder);
//Chuyển sản phẩm từ nhà máy đến đại lý
router.post('/transferproducts', orderController.transferProducts);

module.exports = router;