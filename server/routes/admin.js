var express = require('express');
var router = express.Router();
let adminController = require("../controllers/adminController");

router.get("/getAllAgents", adminController.getAllAgents);
router.get("/getAllFactories", adminController.getAllFactories);
router.delete("/deleteAgentById", adminController.deleteUserById);
router.post("/createNewUser", adminController.createNewUser);
module.exports = router;