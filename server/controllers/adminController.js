const db = require('../models/index');
const sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
class adminController {

    //LẤY TẤT CẢ ĐẠI LÝ
    async getAllAgents(req, res) {
        try {
            let data = await db.DistributionAgent.findAll({
                raw: true,
                include: [{
                    model: db.Account,
                    attributes: ['accStatus'],
                    where: {
                        accStatus: {
                          [sequelize.Op.not]: 'deleted'
                        }
                    },
                }
                ],
               
                nest: true
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Lấy thông tin agents thành công",
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 0,
                msg: "Lỗi server"
            })
        }
    }

    // LẤY TẤT CẢ TRUNG TÂM BẢO HÀNH
    async getAllWarrantyCenter(req, res) {
        try {
            let data = await db.WarrantyCenter.findAll({
                raw: true,
                include: [{
                    model: db.Account,
                    attributes: ['accStatus'],
                    where: {
                        accStatus: {
                          [sequelize.Op.not]: 'deleted'
                        }
                    },
                }
                ],
                
                nest: true
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Lấy thông tin trung tâm bảo hành thành công",
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    //LẤY THÔNG TIN TẤT CẢ NHÀ MÁY
    async getAllFactories(req, res) {
        try {
            let data = await db.Factory.findAll({
                raw: true,
                include: [{
                    model: db.Account,
                    attributes: ['accStatus'],
                    where: {
                        accStatus: {
                          [sequelize.Op.not]: 'deleted'
                        }
                    },
                }
                ],
                
                nest: true
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Lấy thông tin các nhà máy thành công",
                data
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    //XÓA USER THEO ID
    async deleteUserById(req, res) {
        const id = req.query.id;
        if (!id) {
            return res.json({
                errCode: 0,
                msg: "Missing params!"
            })
        }
        try {
            await db.Account.update({
                accStatus: 'deleted'
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
                db.Account.create({
                    id: id,
                    username,
                    hashed,
                    role: 3
                })
                db.DistributionAgent.create({
                    agentCode: id,
                    agentName: name,
                    agentAdress: adress,
                    agentCity: city,
                    agentPhone: phone
                })
            } else if (option === 'cososanxuat') {
                db.Account.create({
                    id: id,
                    username,
                    hashed,
                    role: 1
                })
                db.Factory.create({
                    factoryCode: id,
                    factoryName: name,
                    factoryAdress: adress,
                    factoryCity: city,
                    factoryPhone: phone
                })
            } else if (option === 'baohanh') {
                db.Account.create({
                    id: id,
                    username,
                    hashed,
                    role: 2
                })
                db.WarrantyCenter.create({
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

}
module.exports = new adminController;