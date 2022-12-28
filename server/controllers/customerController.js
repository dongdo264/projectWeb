const db = require('../models/index');
const sequelize = require('sequelize');
class customerController {


    //Tạo mới khách hàng
    async createNewCustomer(req, res) {
        try{
            const customer = req.body.customer;
            const agentCode = req.user.id;

            await db.Customer.create({
                customerCode: customer.customerCode,
                agentCode,
                customerName: customer.customerName,
                dob: customer.dob,
                address: customer.address,
                phone: customer.phone,
                email: customer.email,
                avatar: customer.avatar

            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Create customer successfully!'
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }
    
    //Lấy tất cả khách hàng
    async getAllCustomers(req, res) {
        try{
            const agentCode = req.user.id;
            let data = await db.Customer.findAll({
                where : {
                    agentCode
                },
                include: [
                    {
                        model: db.CustomerProduct,
                        attributes: [
                            [sequelize.fn('count', sequelize.col('customer_products.customerCode')), 'count'],
                        ]
                    }
                ],
                group: ['customers.customerCode']
                
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy danh sách khách hàng thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }
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