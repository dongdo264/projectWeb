var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");

//Lấy thông tin 1 người dùng (đại lý, cơ sở sx, bảo hành);
router.get("/user/:id", userController.getProfileUserById);
//Cập nhật thông tin user
router.put("/user/:id", userController.updateUser);
//Lấy thông tin 1 sản phẩm
router.get("/product/:id", userController.getInfoProductById);
//Lấy tấy cả sản phẩm
router.get("/products", userController.getAllProducts)
// Lấy tất cả nhà máy
router.get("/factories", userController.getAllFactories);
//Lấy tất cả dòng sản phẩm
router.get("/productlines", userController.getAllProductLines);
//Lấy tất cả trung tâm bảo hành
router.get("/warrantycenters", userController.getAllWarrantyCenter);
//Lấy tất cả nhà máy
router.get("/agents", userController.getAllAgents);
module.exports = router;