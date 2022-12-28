var express = require('express');
var router = express.Router();
let factoryController = require("../controllers/factoryController");
const validate = require('../middleware/validate')

//Nhà máy sản xuất sản phẩm
router.post("/production", validate.checkProduction, factoryController.production)
//Lấy ra các hoạt động của nhà máy
router.get("/actions", factoryController.getAllActions);
//Nhà máy lấy đơn hàng
router.get("/orders", factoryController.getAllOrder);
//Kho của nhà máy
router.get("/warehouse", factoryController.getFactoryWarehouse);
//Lấy sản phẩm lỗi
router.get("/faultyproducts", factoryController.getAllFaultyProducts);
//Phân tích số lượng sản xuất
router.get("/analyz", factoryController.analyzQuantityProduced);
module.exports = router;