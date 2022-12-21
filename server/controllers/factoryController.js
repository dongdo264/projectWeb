const db = require('../models/index');
const sequelize = require('sequelize');
class FactoryController {
    //Thêm mới sản phẩm
    async createproduct(req, res) {
        try {
            let id = req.body.id;
            let product = req.body.product;
            let productdetail = req.body.productdetail
            let avatar = req.body.avatar;
            if (!product || !productdetail) {
                return res.status(200).json({
                    errCode: 2,
                    msg: "missing body !"
                })
            } else {
                await db.ProductLine.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
                await db.Product.create({
                    productCode: id,
                    productLine: product.productLine,
                    productName: product.productName,
                    buyPrice: product.productPrice,
                    productStatus: product.status,
                    warrantyPeriod: product.warrantyPeriod,
                    avatar
                });
                await db.Productdetail.create({
                    productCode: id,
                    size: productdetail.size,
                    frame: productdetail.frame,
                    shock: productdetail.shock,
                    rims: productdetail.rims,
                    tires: productdetail.tires,
                    handlebar: productdetail.handlebar,
                    saddle: productdetail.saddle,
                    pedals: productdetail.pedals,
                    brakes: productdetail.brakes,
                    weight: productdetail.weight
                })
                await db.ProductLine.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Tạo sản phẩm thành công!'
                })  
            }
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: 'Lỗi server'
            })
        }
    }

    //Lấy thông tin các sản phẩm
    async getAllProducts(req, res) {
        try{
            let data = await db.Product.findAll({
                raw: true,
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy thông tin sản phẩm thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: 'Lỗi server'
            })
        }
    }

    //Sản xuất sản phẩm
    async production(req, res) {
        try {
            const id = req.body.id;
            const batchCode = req.body.batchCode;
            const quantity = req.body.quantity;
            const color = req.body.color;
            const factoryCode = req.user.id;

            let create = await db.Production.create({
                productCode: id,
                batchCode,
                quantityProduced: quantity,
                factoryCode,
                color,
                status: 'Active'
            })
            if (create) {
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Sản xuất thành công!'
                })
            } else {
                return res.status(500).json({
                    errCode: 2,
                    msg: 'Lỗi server'
                })
            }

        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }

    async getAllActions(req, res) {
        try {
            let factoryCode = req.user.id;
            let data = await db.Production.findAll({
                where: {
                    factoryCode
                },
                order: [
                    ['MFG', 'DESC'],   
                ],
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy thông tin hoạt động thành công!',
                data
            })


        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }

    async getAllOrder(req, res) {
        try{
            const factoryCode = req.user.id;
            let data = await db.Order.findAll({
                where: {
                    factoryCode
                },
                order: [
                    ['orderDate', 'DESC'],   
                ],
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy thông tin đơn hàng thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }

    async getFactoryWarehouse(req, res) {
        try{
            const factoryCode = req.user.id;
            let data = await db.Production.findAll({
                where: {
                    factoryCode
                },
                attributes: [
                    'productCode',
                    'color',
                    [sequelize.fn('sum', sequelize.where(sequelize.col('quantityProduced'), '-', sequelize.col('quantitySold'))), 'sum']
                ],
                group: ['productCode', 'color']
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Xem kho hàng thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }

    


}
module.exports = new FactoryController;