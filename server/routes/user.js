var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");

router.get("/getAllUser", userController.getAllUser);
router.get("/getUserById", userController.getUserById)
module.exports = router;