const db = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
class AuthController {
    async login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return res.status(200).json({
                errCode: 0,
                msg: "Missing params"
            }) 
        }
        try {
            let data = await db.Account.findOne({
                where : {
                    username: username
                }
            });

            if (data) {
                const validPassword = await bcrypt.compare(
                    password,
                    data.password
                );
                if (!validPassword) {
                    return res.status(404).json("Tài khoản hoặc mật khẩu không chính xác");
                } else {
                    try {
                        let token = jwt.sign({
                            user: data
                        }, process.env.JWT_SECRET);
                        return res.status(200).json({
                            errCode: 0,
                            msg: "Đăng nhập thành công!",
                            token: token,
                            username: data.username,
                            role: data.role,
                            isLoggedIn: true
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            } else {
                return res.status(404).json({
                    errCode: 0,
                    msg: "Tài khoản hoặc mật khẩu không đúng!",
                    isLoggedIn: false
                })
            }

        } catch(err) {
            console.log(err);
                return res.status(500).json({
                    errCode: 1,
                    msg: "Lỗi server",
                    isLoggedIn: false
                })
            }
        }
}
module.exports = new AuthController;