var express = require('express');
var router = express.Router();
let adminController = require("../controllers/adminController");

//Cập nhật user active hay inactive
router.put("/user/:id", adminController.deleteUserById);
//Thêm mới người dùng
router.post("/user", adminController.createNewUser);
//Tạo dòng sản phẩm mới
router.post("/productline", adminController.newProductLine)
//Cập nhật dòng sản phẩm
router.put("/productline/:productline", adminController.updateProductLine)
//Tạo sản phẩm mới
router.post("/product", adminController.createproduct);
//Cập nhật sản phẩm
router.put("/product/:id", adminController.updateProduct);

module.exports = router;