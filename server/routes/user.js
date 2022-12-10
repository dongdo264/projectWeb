var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");


router.get("/getprofileuserbyid", userController.getProfileUserById);
router.get("/product/:id", userController.getInfoProductById);
module.exports = router;