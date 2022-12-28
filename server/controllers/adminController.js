const db = require('../models/index');
const sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
class adminController {


    //XÓA USER THEO ID
    async deleteUserById(req, res) {
        const id = req.params.id;
        const status = req.body.status;
        if (!id) {
            return res.json({
                errCode: 0,
                msg: "Missing params!"
            })
        }
        try {
            await db.Account.update({
                status
            },
                {
                where: {
                    id: id
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Xóa đại lý thành công!"
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    //TẠO MỚI 1 USER (CẤP TÀI KHOẢN)
    async createNewUser(req, res) {
        let id = req.body.id;
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let adress = req.body.adress;
        let city = req.body.city;
        let phone = req.body.phone;
        let option = req.body.option;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        try {
            await db.Account.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
            if (option === 'daily') {
                await db.Account.create({
                    id: id,
                    username,
                    password: hashed,
                    role: 3
                })
                await db.DistributionAgent.create({
                    agentCode: id,
                    agentName: name,
                    agentAdress: adress,
                    agentCity: city,
                    agentPhone: phone
                })
            } else if (option === 'cososanxuat') {
                await db.Account.create({
                    id: id,
                    username,
                    password: hashed,
                    role: 1
                })
                await db.Factory.create({
                    factoryCode: id,
                    factoryName: name,
                    factoryAdress: adress,
                    factoryCity: city,
                    factoryPhone: phone
                })
            } else if (option === 'baohanh') {
                await db.Account.create({
                    id: id,
                    username,
                    password: hashed,
                    role: 2
                })
                await db.WarrantyCenter.create({
                    wcCode: id,
                    wcName: name,
                    wcAdress: adress,
                    wcCity: city,
                    wcPhone: phone
                })
            }
            await db.Account.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
            return res.json({
                errCode: 0,
                msg: "Create user successfully"
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }
    

    //Thêm dòng sản phẩm mới
    async newProductLine(req, res) {
        try{
            const data = req.body.data;
            await db.ProductLine.create({
                productLine: data.productLine,
                textDescription: data.textDescription,
                status: data.status
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Tạo sản phẩm thành công!"
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Thêm dòng sản phẩm mới
    async updateProductLine(req, res) {
        try{
            const productLine = req.params.productline;
            console.log(productLine);
            const data = req.body.data;
            await db.ProductLine.update({
                textDescription: data.textDescription,
                status: data.status
            }, {
                where: {
                    productLine: productLine
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Cập nhật thành công!"
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

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

    //Cập nhật sản phẩm
    async updateProduct(req, res) {
        try {
            let id = req.params.id;
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
                await db.Product.update({
                    productLine: product.productLine,
                    productName: product.productName,
                    buyPrice: product.productPrice,
                    productStatus: product.status,
                    warrantyPeriod: product.warrantyPeriod,
                    status: product.status,
                    avatar
                }, {
                    where: {
                        productCode: id
                    }
                });
                await db.Productdetail.update({
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
                }, {
                    where: {
                        productCode: id
                    }
                })
                await db.ProductLine.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Cập nhật sản phẩm thành công!'
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
}
module.exports = new adminController;