var express = require('express');
var router = express.Router();
let factoryController = require("../controllers/factoryController");
const validate = require('../middleware/validate')

router.post("/createproduct", factoryController.createproduct);
router.post("/production", validate.checkProduction, factoryController.production)
router.get("/getallactions", factoryController.getAllActions);
router.get("/getallorders", factoryController.getAllOrder);
router.get("/warehouse", factoryController.getFactoryWarehouse);
router.get("/faultyproducts", factoryController.getAllFaultyProducts);
router.get("/analyzquantityproduced", factoryController.analyzQuantityProduced);
module.exports = router;