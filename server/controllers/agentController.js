const db = require('../models/index');
const sequelize = require('sequelize');
class agentController {

    //Lấy tất cả đơn hàng
    async order(req, res) {
        try {
            const agentCode = req.user.id;
            const data = req.body.data;
            const factoryCode = req.body.factoryCode;
            const orderNumber = Math.floor(Math.random() * 1000000000);
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

    //Lấy các sản phẩm nhập về
    async getAllProductImport(req, res) {
        try {
            const agentCode = req.user.id;
            
            let result = await db.AgentWarehouse.findAll({
                where: {
                    agentCode
                },
                order: [
                    ['createAt', 'DESC'],   
                ],
            })
            return res.status(200).json({
                errCode: 0,
                data: result
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
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

    

    //Bán sản phẩm cho khách hàng
    async sellProducts(req, res) {
        try {
            const customerCode = req.body.customerCode;
            const data = req.body.data;
            const agentCode = req.user.id;

            let check = await db.Customer.findOne({
                where: {
                    customerCode
                }
            })
            if (!check) {
                return res.status(200).json({
                    errCode: 5,
                    msg: 'Not found!',
                    data: "hello"
                })
            }

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
                        model: Math.floor(Math.random() * 10000000),
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
                let sell = warehouse[k].quantityImported - instock;
                await db.AgentWarehouse.update({
                    quantitySold: sell
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

    

    //Lấy sản phẩm đã bán
    async getProductsAreSold(req, res) {
        try{
            const agentCode = req.user.id;
            const customer = await db.Customer.findAll({
                attributes: ['customerCode'],
                where: {
                    agentCode
                },
                raw: true
            })
            let arr = [];
            for (let i in customer) {
                arr.push(customer[i].customerCode);
            }
            let data = await db.CustomerProduct.findAll({
                where: {
                    customerCode: {
                        [sequelize.Op.in]: arr
                    }
                },
                include: [
                    {
                        model: db.AgentWarehouse,
                        attributes: [
                            ['productCode', 'productCode'],['color', 'color']
                        ]
                    },
                    {
                        model: db.Customer,
                        attributes: [
                            'customerName', 'phone'
                        ]
                    },
                    
                ],
                order: [
                    ['dateOfPurchase', 'DESC'],   
                ],
            })
            let arr_ = []
            for (let i in data) {
                let warranty = await db.Product.findOne({
                    where: {
                        productCode: data[i].agentwarehouse.productCode,
                    },
                    attributes: [
                        'warrantyPeriod'
                    ],
                    
                });
                let obj = {
                    warrantyPeriod: warranty.warrantyPeriod
                }
                arr_.push(obj);
            }
            return res.status(200).json({
                errCode: 0,
                msg: 'Lấy sản phẩm đã bán thành công!',
                data,
                warranty: arr_
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
            // const id = 
            // let check = await db.Warranty.findOne({
            //     where: {

            //     }
            // })
            let create = await db.Warranty.create({
                warrantyCode: Math.floor(Math.random() * 1000000000),
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
            console.log(err);
            return res.status(500).json("Lỗi server!!");
        }
    }

    //Lấy các hoạt động bảo hành
    async getAllWarrantyClaim(req, res) {
        try {
            const agentCode = req.user.id;
            let data = await db.Warranty.findAll({
                where: {
                    agentCode
                },
                order: [
                    ['createAt', 'DESC'],   
                ],
            })
            return res.status(200).json({
                errCode: 0, 
                msg: 'Lấy hoạt động bảo hành thành công!',
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Triệu hồi
    async updateStatusProduct(req, res) {
        try {
            const productCode = req.params.id;
            const status = req.body.status;
            const id = req.user.id;
            
            if (req.user.role === 10) {
                const batchCode = await db.AgentWarehouse.findAll({
                    where: {
                        productCode
                    },
                    attributes: [
                        'batchCode'
                    ],
                    raw: true
                })
                for (let i in batchCode) {
                    await db.CustomerProduct.update({
                        status
                    }, {
                        where: {
                            batchCode: batchCode[i].batchCode,
                            status: "Active"
                        }
                    })
                }
            } else if (req.user.role === 3) {
                const warehouse = await db.AgentWarehouse.findAll({
                    where: {
                        agentCode: id,
                        productCode
                    },
                    group: ['batchCode'],
                    raw: true
                })
                for (let i in warehouse) {
                    await db.CustomerProduct.update({
                        status
                    }, {
                        where: {
                            batchCode: warehouse[i].batchCode,
                            status: "Active"
                        }
                    })
                }
            }
            return res.status(200).json({
                errCode: 0,
                msg: 'Update successfully'
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }
    
    //Cập nhật trạng thái sản phẩm
    async updateCustomerProduct(req, res) {
        try{
            const model = req.params.model;
            await db.CustomerProduct.update({
                status: req.body.status
            }, {
                where: {
                    model
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Update successfully!'
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

     //chuyển lại sản phẩm về cơ sở sản xuất
     async backToFactory(req, res) {
        try {
            const dt = req.body.data;
            
            await db.AgentWarehouse.update({
                quantityImported: dt.quantitySold 
            }, {
                where: {
                    batchCode: dt.batchCode,
                    productCode: dt.productCode,
                    color: dt.color,
                    agentCode: req.user.id
                }
            })
            let check = await db.Production.findOne({
                where: {
                    batchCode: dt.batchCode
                },
                raw: true
            })
            let quantityBack = check.quantitySold - (dt.quantityImported - dt.quantitySold);
            await db.Production.update({
                quantitySold: quantityBack
            }, {
                where: {
                    batchCode: dt.batchCode
                }
            })
            return res.status(200).json({
                errCode: 0, 
                msg: 'Chuyển sản phẩm về nhà máy thành công!'
               
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Phân thích sản phẩm bán được
    async analyzProductSold(req, res) {
        try {
            const agentCode = req.user.id;
            const type = req.query.type;
            const d = new Date();
            const year = d.getFullYear();
            if (req.user.role === 3) {
                if (type === "month" || type === "quarter") {
                    let data = await db.AgentWarehouse.findAll({
                        where: {
                            createdAt: sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("createAt")),
                            year),
                            agentCode
                        },
                        attributes: [
                            [sequelize.fn("MONTH", sequelize.col("createAt")), "month"],
                            [sequelize.fn('SUM', sequelize.col('quantityImported')), 'sum']
                        ],
                        group: ["month"],
                        raw: true
                    })
              
                    const customer = await db.Customer.findAll({
                        attributes: ['customerCode'],
                        where: {
                            agentCode
                        },
                        raw: true
                    })
                    let arr = [];
                    for (let i in customer) {
                        arr.push(customer[i].customerCode);
                    }
                    let dataSold = await db.CustomerProduct.findAll({
                        where: {
                            customerCode: {
                                [sequelize.Op.in]: arr
                            },
                            dateOfPurchase: sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("dateOfPurchase")),
                            year)
                        },
                        attributes: [
                            [sequelize.fn("MONTH", sequelize.col("dateOfPurchase")), "month"],
                            [sequelize.fn('count', sequelize.col('model')), 'sum']
                        ],
                        group: ["month"],
                        raw: true
                    })
                 
                    let result = [];
                    for (let i = 1; i <= 12; i++) {
                        
                        let obj = {};
                        obj.month = i;
                        obj.sold = 0;
                        obj.imported = 0;
                        for (let j in data) {
                            if (data[j].month === i) { 
                                obj.imported += parseInt(data[j].sum);
                            }
                        }
                        for (let j in dataSold) {
                            if (dataSold[j].month === i) { 
                                obj.sold += parseInt(dataSold[j].sum);
                            }
                        }
                        
                            obj.month = "Tháng " + i;
                            result.push(obj);
                        }
                        // console.log(result);

                        let arr_ = [];
                        let k = 1;
                        let sold = 0;
                        let imported = 0;
                        for (let i = 0; i < 12; i++) {
                            sold += parseInt(result[i].sold);
                            imported += parseInt(result[i].imported);
                            if (i === 2 || i === 5 || i === 8 || i === 11) {
                                let obj_ = {};
                                obj_.quarter = "Quý " + k;
                                obj_.sold = sold;
                                obj_.imported = imported;
                                k++;
                                arr_.push(obj_);
                                sold = 0;
                                imported = 0;
                            }
                        }
                 
                        if (type === "month") {
                            return res.status(200).json({
                                errCode: 0,
                                msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                                data: result
                            })
                        } else if (type === "quarter") {
                            return res.status(200).json({
                                errCode: 0,
                                msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                                data: arr_
                            })
                        }
                    } else if (type === 'year') {
                        let data = await db.AgentWarehouse.findAll({
                            where: {
                                agentCode
                            },
                            attributes: [
                                [sequelize.fn("YEAR", sequelize.col("createAt")), "year"],
                                [sequelize.fn('SUM', sequelize.col('quantityImported')), 'sum']
                            ],
                            group: ["year"],
                            raw: true
                        })
                       
                        const customer = await db.Customer.findAll({
                            attributes: ['customerCode'],
                            where: {
                                agentCode
                            },
                            raw: true
                        })
                        let arrID = [];
                        for (let i in customer) {
                            arrID.push(customer[i].customerCode);
                        }
                        let dataSold = await db.CustomerProduct.findAll({
                            where: {
                                customerCode: {
                                    [sequelize.Op.in]: arrID
                                },
                            },
                            attributes: [
                                [sequelize.fn("Year", sequelize.col("dateOfPurchase")), "year"],
                                [sequelize.fn('count', sequelize.col('model')), 'sum']
                            ],
                            group: ["year"],
                            raw: true
                        })
                        let arr = [];
                        for (let i = year - 3; i <= year; i++) {
                            let obj = {};
                            let sold = 0;
                            let imported = 0;
                            for (let j in data) {
                                if (data[j].year === i) {
                                    imported = parseInt(data[j].sum);
                                }
                            }
                            for (let j in dataSold) {
                                if (dataSold[j].year === i) {
                                    sold =parseInt(dataSold[j].sum);
                                }
                            }
                        
                            let obj_ = {};
                            obj_.year = "Năm " + i;
                            obj_.sold = sold;
                            obj_.imported = imported;
                            arr.push(obj_);
                        }
                        return res.status(200).json({
                            errCode: 0,
                            data: arr
                        })
                    }
            } else if (req.user.role === 10) {
                if (type === "month" || type === "quarter") {
                    let data = await db.AgentWarehouse.findAll({
                        where: {
                            createdAt: sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("createAt")),
                            year),
                        },
                        attributes: [
                            [sequelize.fn("MONTH", sequelize.col("createAt")), "month"],
                            [sequelize.fn('SUM', sequelize.col('quantityImported')), 'sum']
                        ],
                        group: ["month"],
                        raw: true
                    })
                    // const customer = await db.Customer.findAll({
                    //     attributes: ['customerCode'],
                    //     where: {
                    //         agentCode
                    //     },
                    //     raw: true
                    // })
                    // let arr = [];
                    // for (let i in customer) {
                    //     arr.push(customer[i].customerCode);
                    // }
                    let dataSold = await db.CustomerProduct.findAll({
                        where: {
                            dateOfPurchase: sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("dateOfPurchase")),
                            year)
                        },
                        attributes: [
                            [sequelize.fn("MONTH", sequelize.col("dateOfPurchase")), "month"],
                            [sequelize.fn('count', sequelize.col('model')), 'sum']
                        ],
                        group: ["month"],
                        raw: true
                    })
                 
                    let result = [];
                    for (let i = 1; i <= 12; i++) {
                        let obj = {};
                        obj.month = i;
                        obj.sold = 0;
                        obj.imported = 0;
                        for (let j in data) {
                            if (data[j].month === i) { 
                                obj.imported += parseInt(data[j].sum);
                            }
                        }
                        for (let j in dataSold) {
                            if (dataSold[j].month === i) { 
                                obj.sold += parseInt(dataSold[j].sum);
                            }
                        }
                        
                            obj.month = "Tháng " + i;
                            result.push(obj);
                        }
                        // console.log(result);

                        let arr_ = [];
                        let k = 1;
                        let sold = 0;
                        let imported = 0;
                        for (let i = 0; i < 12; i++) {
                            sold += parseInt(result[i].sold);
                            imported += parseInt(result[i].imported);
                            if (i === 2 || i === 5 || i === 8 || i === 11) {
                                let obj_ = {};
                                obj_.quarter = "Quý " + k;
                                obj_.sold = sold;
                                obj_.imported = imported;
                                k++;
                                arr_.push(obj_);
                                sold = 0;
                                imported = 0;
                            }
                        }
                
                        if (type === "month") {
                            return res.status(200).json({
                                errCode: 0,
                                msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                                data: result
                            })
                        } else if (type === "quarter") {
                            return res.status(200).json({
                                errCode: 0,
                                msg: 'Lấy thống kê sản phẩm sản xuất theo tháng thành công!',
                                data: arr_
                            })
                        }
                    } else if (type === 'year') {
                        let data = await db.AgentWarehouse.findAll({
                            attributes: [
                                [sequelize.fn("YEAR", sequelize.col("createAt")), "year"],
                                [sequelize.fn('SUM', sequelize.col('quantityImported')), 'sum']
                            ],
                            group: ["year"],
                            raw: true
                        })
                 
                        let dataSold = await db.CustomerProduct.findAll({
                            attributes: [
                                [sequelize.fn("Year", sequelize.col("dateOfPurchase")), "year"],
                                [sequelize.fn('count', sequelize.col('model')), 'sum']
                            ],
                            group: ["year"],
                            raw: true
                        })
                        let arr = [];
                        for (let i = year - 3; i <= year; i++) {
                            let sold = 0;
                            let imported = 0;
                            for (let j in data) {
                                if (data[j].year === i) {
                                    imported = parseInt(data[j].sum);
                                }
                            }
                            for (let j in dataSold) {
                                if (dataSold[j].year === i) {
                                    sold =parseInt(dataSold[j].sum);
                                }
                            }
                        
                            let obj_ = {};
                            obj_.year = "Năm " + i;
                            obj_.sold = sold;
                            obj_.imported = imported;
                            arr.push(obj_);
                        }
                        return res.status(200).json({
                            errCode: 0,
                            data: arr
                        })
                    }
            }
                
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server")
        
        } 
    }
   
}
module.exports = new agentController;