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
//Lấy sản phẩm đã nhập về
router.get("/productsimported", agentController.getAllProductImport);
//Chuyển sản phẩm về nhà máy
router.put("/agentwarehouse", agentController.backToFactory);
//Phân tích số lượng bán ra, nhập vào
router.get("/analyz", agentController.analyzProductSold)
//Triệu hồi sản phẩm
router.put("/product/:id", agentController.updateStatusProduct);

module.exports = router;