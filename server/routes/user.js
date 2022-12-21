var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");


router.get("/getprofileuserbyid", userController.getProfileUserById);
router.get("/product/:id", userController.getInfoProductById);
router.get("/getallproducts", userController.getAllProducts)
router.get("/getallfactories", userController.getAllFactories);
router.get("/getallproductlines", userController.getAllProductLines)
module.exports = router;