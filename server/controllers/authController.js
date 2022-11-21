const db = require('../models/index');
const jwt = require('jsonwebtoken')
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
                    username: username,
                    password: password
                }
            });

            if (data) {
                try {
                    let token = jwt.sign({
                        userID: data.id
                    }, process.env.JWT_SECRET);
                    console.log(token);
                    return res.status(200).json({
                        errCode: 0,
                        msg: "Đăng nhập thành công!",
                        token: token
                    })
                } catch (err) {
                    console.log(err)
                }
            } else {
                return res.json({
                    errCode: 0,
                    msg: "Tài khoản hoặc mật khẩu không đúng!"
                })
            }

        } catch(err) {
            console.log(err);
                return res.status(500).json({
                    errCode: 1,
                    msg: "Lỗi server"
                })
            }
        }
}
module.exports = new AuthController;