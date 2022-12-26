const db = require('../models/index');
const sequelize = require('sequelize');
class customerController {

    //Update trạng thái sản phẩm của khách
    async getCustomerById(req, res) {
        try {
            const id = req.params.id;
            let data = await db.Customer.findOne({
                where: {
                    customerCode: id
                }
            })
            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    //Cập nhật khách hàng
    async updateCustomer(req, res) {
        try{
            const customerCode = req.params.id;
            const data = req.body.data;
            await db.Customer.update({
                customerName: data.customerName,
                dob: data.dob,
                address: data.address,
                phone: data.phone,
                email: data.email,
                avatar: data.avatar
            }, {
                where: {
                    customerCode
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Cập nhật thông tin khách hàng thành công!'
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server");
        }
    }

    

   
}
module.exports = new customerController;