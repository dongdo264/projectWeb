var express = require('express');
var router = express.Router();
let factoryController = require("../controllers/factoryController");


router.post("/production", factoryController.productions);
module.exports = router;