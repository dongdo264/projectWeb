var express = require('express');
var router = express.Router();
let agentController = require("../controllers/agentController");

router.post('/order', agentController.order)
router.get('/warehouse', agentController.warehouse);
router.post('/createcustomer', agentController.createNewCustomer);
router.post('/sellproducts', agentController.sellProducts);
router.get("/customers", agentController.getAllCustomers);
router.get("/productsaresold", agentController.getProductsAreSold)
router.post("/sendwarrantyclaim", agentController.sendWarrantyClaim)

module.exports = router;