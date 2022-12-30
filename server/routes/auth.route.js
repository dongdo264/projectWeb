var express = require('express');
var router = express.Router();
let authController = require("../controllers/authController");

router.post("/login", authController.login);
module.exports = router;