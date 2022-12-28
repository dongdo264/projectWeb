var express = require('express');
var router = express.Router();
let agentController = require("../controllers/agentController");

//Xem kho của đại lý
router.get('/warehouse', agentController.warehouse);
//Bán sản phẩm
router.post('/sellproducts', agentController.sellProducts);
//Lấy sản phẩm đã bán
router.get("/productsaresold", agentController.getProductsAreSold);
//Gửi yêu cầu bảo hành
router.post("/sendwarrantyclaim", agentController.sendWarrantyClaim);
//Lấy yêu cầu bảo hành
router.get("/warrantyclaim", agentController.getAllWarrantyClaim)
//Cập nhật sản phẩm của khách hàng
router.put("/customerproduct/:model", agentController.updateCustomerProduct)

module.exports = router;