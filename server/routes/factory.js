var express = require('express');
var router = express.Router();
let factoryController = require("../controllers/factoryController");


router.post("/createproduct", factoryController.createproduct);
router.get("/getallproducts", factoryController.getAllProducts);
module.exports = router;