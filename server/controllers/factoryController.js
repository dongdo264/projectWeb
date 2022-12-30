const db = require('../models/index');
const sequelize = require('sequelize');
class FactoryController {
    

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

    //Lấy kho hàng của nhà máy
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
                msg: 'Xem kho hàng thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }

    //Lấy các sản phẩm lỗi được gửi về nhà máy
    async getAllFaultyProducts(req, res) {
        try{
            const factoryCode = req.user.id;
            let data = await db.FaultyProduct.findAll({
                where: {
                    factoryCode
                }
            })
            return res.status(200).json({
                errCode: 0,
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Phân tích sản phẩm sản xuất
    async analyzQuantityProduced(req, res) {
        try{
            const factoryCode = req.user.id;
            const type = req.query.type;
            const d = new Date();
            const year = d.getFullYear();
            if (req.user.role === 1) {
                if (type === "month" || type === "quarter") {
                    let data = await db.Production.findAll({
                        where: {
                            createdAt: sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("MFG")),
                            year),
                            factoryCode
                        },
                        attributes: [
                            [sequelize.fn("MONTH", sequelize.col("MFG")), "month"],
                            [sequelize.fn('SUM', sequelize.col('quantityProduced')), 'sum']
                        ],
                        group: ["month"],
                        raw: true
                    })
                    let result = [];
                    for (let i = 1; i <= 12; i++) {
                        let check = true;
                        for (let j in data) {
                            if (data[j].month === i) { 
                                data[j].month = "Tháng " + i;
                                result.push(data[j]);
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            let obj= {};
                            obj.month = "Tháng " + i;
                            obj.sum = 0;
                            result.push(obj);
                        }
                    }
                    if (type === 'quarter') {
                        let arr = [];
                        let sum = 0;
                        let k = 1;
                        for (let i = 0;i < 12; i++) {
                            sum += parseInt(result[i].sum);
                            if (i === 2 || i === 5 || i === 8 || i === 11) {
                                let obj = {};
                                obj.sum = sum;
                                obj.quarter = "Quý " + k;
                                k++;
                                sum = 0;
                                arr.push(obj);
                            }
                        }
                        return res.status(200).json({
                            errCode: 0,
                            msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                            data: arr
                        })
                    }
                    return res.status(200).json({
                        errCode: 0,
                        msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                        data: result
                    })
                } else if (type === 'year') {
                    let data = await db.Production.findAll({
                        where: { 
                            factoryCode
                        },
                        attributes: [
                            [sequelize.fn("YEAR", sequelize.col("MFG")), "year"],
                            [sequelize.fn('SUM', sequelize.col('quantityProduced')), 'sum']
                        ],
                        group: ["year"],
                        raw: true
                    })
                    let arr = [];
                    for (let i = year - 3; i <= year; i++) {
                        let check = true
                        for (let j in data) {
                            if (data[j].year === i) {
                                data[j].year = "Năm " + i;
                                arr.push(data[j]);
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            let obj = {};
                            obj.year = "Năm " + i;
                            obj.sum = "0";
                            arr.push(obj);
                        }
                    }
                    return res.status(200).json({
                        errCode: 0,
                        data: arr
                    })
                }
            } else if (req.user.role === 10) {
                if (type === "month" || type === "quarter") {
                    let data = await db.Production.findAll({
                        where: {
                            createdAt: sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("MFG")),
                            year),
                        },
                        attributes: [
                            [sequelize.fn("MONTH", sequelize.col("MFG")), "month"],
                            [sequelize.fn('SUM', sequelize.col('quantityProduced')), 'sum']
                        ],
                        group: ["month"],
                        raw: true
                    })
                    let result = [];
                    for (let i = 1; i <= 12; i++) {
                        let check = true;
                        for (let j in data) {
                            if (data[j].month === i) { 
                                data[j].month = "Tháng " + i;
                                result.push(data[j]);
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            let obj= {};
                            obj.month = "Tháng " + i;
                            obj.sum = 0;
                            result.push(obj);
                        }
                    }
                    if (type === 'quarter') {
                        let arr = [];
                        let sum = 0;
                        let k = 1;
                        for (let i = 0;i < 12; i++) {
                            sum += parseInt(result[i].sum);
                            if (i === 2 || i === 5 || i === 8 || i === 11) {
                                let obj = {};
                                obj.sum = sum;
                                obj.quarter = "Quý " + k;
                                k++;
                                sum = 0;
                                arr.push(obj);
                            }
                        }
                        return res.status(200).json({
                            errCode: 0,
                            msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                            data: arr
                        })
                    }
                    return res.status(200).json({
                        errCode: 0,
                        msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                        data: result
                    })
                } else if (type === 'year') {
                    let data = await db.Production.findAll({
                        
                        attributes: [
                            [sequelize.fn("YEAR", sequelize.col("MFG")), "year"],
                            [sequelize.fn('SUM', sequelize.col('quantityProduced')), 'sum']
                        ],
                        group: ["year"],
                        raw: true
                    })
                    let arr = [];
                    for (let i = year - 3; i <= year; i++) {
                        let check = true
                        for (let j in data) {
                            if (data[j].year === i) {
                                data[j].year = "Năm " + i;
                                arr.push(data[j]);
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            let obj = {};
                            obj.year = "Năm " + i;
                            obj.sum = "0";
                            arr.push(obj);
                        }
                    }
                    return res.status(200).json({
                        errCode: 0,
                        data: arr
                    })
                }
            }
            
        }catch(err){
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    } 

    
}
module.exports = new FactoryController;