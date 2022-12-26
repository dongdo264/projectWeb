var express = require('express');
var router = express.Router();
let agentController = require("../controllers/agentController");

router.post('/order', agentController.order)
router.get('/warehouse', agentController.warehouse);
router.post('/createcustomer', agentController.createNewCustomer);
router.post('/sellproducts', agentController.sellProducts);
router.get("/customers", agentController.getAllCustomers);
router.get("/productsaresold", agentController.getProductsAreSold)
router.post("/sendwarrantyclaim", agentController.sendWarrantyClaim);
router.get("/warranties", agentController.getAllWarrantyClaim)
router.put("/product/:productCode", agentController.updateStatusProduct);
router.put("/customerproduct/:model", agentController.updateCustomerProduct)

module.exports = router;