var express = require('express');
var router = express.Router();
let warrantyController = require('../controllers/warrantyController')

router.get("/warranties", warrantyController.getAllActions);
router.put("/warrantysuccess/:id", warrantyController.sendProductToAgent);
router.put("/warrantyfailed/:id", warrantyController.sendProductToFactory);
router.get("/analyzwarranty", warrantyController.analyzQuantityWarranty)
module.exports = router;