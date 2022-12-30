const db = require('../models/index');
module.exports = {
    //Kiểm tra xóa user
    deleteUserByid: async (req, res, next) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.json({
                    errCode: 2,
                    msg: "Missing params!"
                })
            }
            let check = await db.Account.findOne({
                where: {
                    id
                }
            })
            if (!check) {
                if (!id) {
                    return res.json({
                        errCode: 3,
                        msg: "Không tồn tại id này!"
                    })
                }
            }
            next();
        }catch(err) {
            return res.status(500).json("Lỗi server!")
        }
    },
    //Kiểm tra tạo user mới
    createNewProduct: async (req, res, next) => {
        try {

            let id = req.body.id;
            let username = req.body.username;
            let password = req.body.password;
            let name = req.body.name;
            let address = req.body.address;
            let city = req.body.city;
            let phone = req.body.phone;
            let option = req.body.option;
            if (!id || !username || !password || !name || !address || !city ||  !phone || !option ) {
                return res.json("Missing params");
            }
            let check = await db.Account.findOne({
                where: {
                    id
                }
            })
            if (check) {
                id = Math.floor(Math.random() * 10000000000);
            }
            req.body.id = id;
            next();
        }catch(err) {
            return res.status(500).json("Lỗi server!")
        }
    }

}