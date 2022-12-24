const db = require('../models/index');
const sequelize = require('sequelize');
class agentController {

    //LẤY TẤT CẢ ĐẠI LÝ
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

    //Lấy kho hàng của đại lý
    async warehouse(req, res) {
        try{
            const agentCode = req.user.id;
            let data = await db.AgentWarehouse.findAll({
                where: {
                    agentCode
                },
                attributes: [
                    'productCode',
                    'color',
                    [sequelize.fn('sum', sequelize.where(sequelize.col('quantityImported'), '-', sequelize.col('quantitySold'))), 'sum'] 
                ],
                group: ['productCode', 'color'],
                raw: true
            })
            for (let i in data) {
                let product = await db.Product.findOne({
                    where: {
                        productCode: data[i].productCode
                    },
                    raw: true
                })
                data[i].productName = product.productName;
            }

            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy thông tin kho hàng thành công',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!!");
        }
    }

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
                adress: customer.adress,
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

    //Bán sản phẩm cho khách hàng
    async sellProducts(req, res) {
        try {
            const customerCode = req.body.customerCode;
            const data = req.body.data;
            const agentCode = req.user.id;

            for (let i in data) {
                let warehouse = await db.AgentWarehouse.findAll({
                    where: {
                        agentCode,
                        productCode: data[i].productCode,
                        color: data[i].color,
                        quantityImported: {
                            [sequelize.Op.gt] : [sequelize.col('quantitySold')]
                        }
                    },
                    raw: true
                })
                let k = 0;
                let instock = warehouse[k].quantityImported - warehouse[k].quantitySold
                for (let j = 0; j < data[i].quantity; j++) {
                    await db.CustomerProduct.create({
                        model: Date.now() % 10000000,
                        customerCode,
                        agentCode,
                        batchCode: warehouse[k].batchCode
                    })
                    instock -= 1;
                    if (instock === 0) {
                        await db.AgentWarehouse.update({
                            quantitySold: warehouse[k].quantityImported
                        }, {
                            where: {
                                agentCode,
                                productCode: data[i].productCode,
                                color: data[i].color,
                                batchCode: warehouse[k].batchCode
                            }
                        })
                        k += 1;
                        
                        instock = warehouse[k].quantityImported - warehouse[k].quantitySold;
                    }
                }
                await db.AgentWarehouse.update({
                    quantitySold: data[i].quantity
                }, {
                    where: {
                        agentCode,
                        productCode: data[i].productCode,
                        color: data[i].color,
                        batchCode: warehouse[k].batchCode
                    }
                })
            }
            return res.status(200).json({
                errCode: 0,
                msg: 'Sell products successfully!'
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
                raw: true
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

    //Lấy sản phẩm đã bán
    async getProductsAreSold(req, res) {
        try{
            const agentCode = req.user.id;
            let data = await db.CustomerProduct.findAll({
                //raw: true,
                include: [
                    {
                        model: db.AgentWarehouse,
                        attributes: [
                            ['productCode', 'productCode'],['color', 'color']
                        ]
                    }
                ]
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy sản phẩm đã bán thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: 'Lỗi server!'
            })
        }
    }

    //Gửi yêu cầu bảo hành
    async sendWarrantyClaim(req, res) {
        try {
            const agentCode = req.user.id;
            const data = req.body.data;
            let create = await db.Warranty.create({
                warrantyCode: Date.now() % 10000000000,
                agentCode,
                wcCode: data.wcCode,
                model: data.model,
                productCode: data.productCode,
                note: data.note,
                status: 'Đang sửa chữa'
            })

            await db.CustomerProduct.update({
                status: "Đang bảo hành"
            }, {
                where: {
                    model: data.model,
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Gửi yêu cầu bảo hành thành công!'
            })
        }catch(err) {
            consosle.log(err);
            return res.status(500).json("Lỗi server!!");
        }
    }
   
}
module.exports = new agentController;