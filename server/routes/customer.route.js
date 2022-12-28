var express = require('express');
var router = express.Router();
let customerController = require('../controllers/customerController')

//Tạo khách hàng mới
router.post('/customer', customerController.createNewCustomer);
//Lấy tất cả khách hàng
router.get("/customers", customerController.getAllCustomers);
//Lấy khách hàng theo id
router.get('/customer/:id', customerController.getCustomerById);
//Cập nhật thông tin khách hàng
router.put('/customer/:id', customerController.updateCustomer);

module.exports = router;