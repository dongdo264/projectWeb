var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");

router.get("/getAllUser", userController.getAllUser);
router.get("/getUserById", userController.getUserById)
router.post('/createUser', userController.createUser);
router.delete("/deleteUserById", userController.deleteUserById);
router.get("/getAllProducts", userController.getAllProduct);
module.exports = router;