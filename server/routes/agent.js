var express = require('express');
var router = express.Router();
let agentController = require("../controllers/agentController");

router.post('/order', agentController.order)

module.exports = router;