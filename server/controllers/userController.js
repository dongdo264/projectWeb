const db = require('../models/index');
class userController {
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

}
module.exports = new userController;