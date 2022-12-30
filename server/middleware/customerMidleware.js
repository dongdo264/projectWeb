const db = require('../models/index');
module.exports = {
    //Kiểm tra Thêm user
    createCustomer: async (req, res, next) => {
        try {
            const customer = req.body.customer;
            if (!customer || !customer.customerCode || !customer.customerName || !customer.dob || 
                !customer.address || !customer.phone) {
                return res.status(400).json("Mising params");
            }
            while(true) {
                let check = await db.Customer.findOne({
                    where: {
                        customerCode: customer.customerCode
                    }
                })
                if (check) {
                    customer.customerCode = Math.floor(Math.random() * 1000000000);
                } else {
                    break;
                }
            }
            req.body.customer.customerCode = customer.customerCode;
            next();
        }catch(err) {
            return res.status(500).json("Lỗi server!")
        }
    },

}