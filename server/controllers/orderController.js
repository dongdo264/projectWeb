const db = require('../models/index');
const sequelize = require('sequelize');
class orderController {

    //Tạo đơn hàng mới
    async order(req, res) {
        try {
            const agentCode = req.user.id;
            const data = req.body.data;
            const factoryCode = req.body.factoryCode;
            const orderNumber = Date.now() % 100000000;
            await db.Order.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
            await db.Order.create({
                orderNumber,
                agentCode,
                factoryCode,
                status: 'Pending'
            })
            for (let index = 0; index < data.length; index++) {
                await db.OrderDetail.create({
                    orderNumber,
                    productCode: data[index].productCode,
                    quantity: data[index].quantity,
                    color: data[index].color
                })
            }
            await db.Order.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
            return res.status(200).json({
                errCode: 0,
                msg: 'Order successfully!'
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }
    //Lấy thông tin đơn hàng
    async getInfoOrder (req, res) {
        try {
            const orderNumber = req.params.id;
            let data = await db.Order.findOne({
                where: {
                    orderNumber
                },
                include: [{
                    model: db.OrderDetail
                }]
            })
            console.log(data);
            if (!data) {
                return res.status(400).json("Không tìm thấy đơn hàng!")
            }
            let factory = await db.Factory.findOne({
                where: {
                    factoryCode: data.factoryCode
                }
            })
            let agent = await db.DistributionAgent.findOne({
                where: {
                    agentCode: data.agentCode
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Lấy thông tin đơn hàng thành công!",
                data,
                factory, 
                agent
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    //Nhà máy chuyển hàng cho đại lý
    async transferProducts(req, res) {
        try {
            const orderNumber = req.body.orderNumber;
            const data = await db.Order.findOne({
                where: {
                    orderNumber
                },
                include: [
                    {
                        model: db.OrderDetail
                    }
                ]
            })
            const orderdetails = data.orderdetails;
            for (let i in orderdetails) {
                let data_ = await db.Production.findAll({
                    where: {
                        factoryCode: data.factoryCode,
                        color: orderdetails[i].color,
                        productCode: orderdetails[i].productCode
                    }
                })
                let quantity = orderdetails[i].quantity;
                for (let j in data_) {
                    let quantity_ = data_[j].quantityProduced - data_[j].quantitySold;
                    let quantityInsert = 0;
                    if (quantity_ >= orderdetails[i].quantity) {
                        quantityInsert = orderdetails[i].quantity;
                    } else {
                        quantityInsert = quantity_
                    }
                    if (quantity_ > 0) {
                        let agentCreate = await db.AgentWarehouse.create({
                            agentCode: data.agentCode,
                            batchCode: data_[j].batchCode,
                            productCode: data_[j].productCode,
                            color: data_[j].color,
                            quantityImported: quantityInsert
                        })
                        await db.Production.update({
                                quantitySold: quantityInsert + data_[j].quantitySold
                            }, {
                                where: {
                                    batchCode: data_[j].batchCode,
                                    productCode: data_[j].productCode,
                                    color: data_[j].color
                                }
                            }
                        )
                    }
                    if (quantity_ >= quantity) {
                        break;
                    } else {
                        quantity = quantity - quantity_;
                    }
                }
            }
            await db.Order.update({
                status: 'Hoàn tất'
            }, {
                where: {
                    orderNumber: orderNumber
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Chuyển sản phẩm thành công!'
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }
   
}
module.exports = new orderController;