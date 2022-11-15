const account = require('../models/index').Account;
class AuthController {
    async login(req, res) {
        try {
            let username = req.body.username;
            let password = req.body.password;
            let data = await account.findOne({
                where : {
                    username,
                    password
                }
            });
            if (data) {
                    return res.status(200).json({
                    errCode: 0,
                    id: data.id,
                    msg: "Login successfuly"
                });
            }
            return res.status(200).json({
                errCode: 0,
                msg: "Login failed"
            })
        } catch(err) {
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }
}
module.exports = new AuthController;