const db = require('../models/index');
const bcryptjs  = require('bcryptjs');
class userController {
    async createUser(req, res) {
        //console.log(req.body.userName);
        try {
            let userName= req.body.userName;
            let userDob= req.body.userDob;
            let userAdress= req.body.userAdress;
            let userPhone= req.body.userPhone;
            let userEmail= req.body.userEmail;
            let userStatus=  req.body.userStatus;
            if (!userName || !userAdress || !userPhone || !userEmail) {
                return res.status(200).json({
                    errCode: 0,
                    msg: "Missing params!"
                })
            }
            let data = {
                userCode: 5,
                userName,
                userDob,
                userAdress,
                userPhone,
                userEmail,
                userStatus
            }
            console.log(data);
            await db.User.create({
                userCode: Date.now() % 100000000,
                userName,
                userDob,
                userAdress,
                userPhone,
                userEmail,
                userStatus
            });
            return res.status(200).json({
                errCode: 0,
                msg: "Tạo user thành công!"
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    async deleteUserById(req, res) {
        try {
            const id = req.query.id;
            await db.Account.destroy({
                where: {
                    id : id
                }
            })
            await db.User.update({
                userStatus: 'deleted'
            }, {
                where: {
                    userCode: id
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Xóa user thành công!"
            })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    async getAllUser(req, res) {
        try {
            let data = await db.User.findAll({
                raw: true
            });
            if (data) {
                    return res.status(200).json({
                    errCode: 0,
                    data,
                    msg: "get All user successfuly"
                });
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.query.id;
            let data = await db.User.findOne({
                where: {
                    userCode: id
                },
                include: [
                    {
                        model: db.Account
                    }
                ],
                raw: true,
                nest: true
            });
            console.log(data.userAdress)
            if (data) {
                    return res.status(200).json({
                    errCode: 0,
                    data,
                    msg: "get All user successfuly"
                });
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    async getAllProduct(req, res) {
        try {
            let data = await db.Product.findAll({
                raw: true,
                include: [
                    {
                    model: db.Productdetail
                    }
                ]
            })
            if (data) {
                return res.status(200).json({
                    errCode: 0,
                    msg: "Lấy thông tin sản phẩm thành công",
                    data: data
                })
            } else {
                return res.status(200).json({
                    errCode: 0,
                    msg: "Lấy thông tin sản phẩm không thành công"
                })
            }
        }catch(err) {
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

}
module.exports = new userController;