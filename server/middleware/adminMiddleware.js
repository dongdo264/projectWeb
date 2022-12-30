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
    createNewUser: async (req, res, next) => {
        try {
            let id = req.body.id;
            let username = req.body.username;
            let password = req.body.password;
            let name = req.body.name;
            let address = req.body.adress;
            let city = req.body.city;
            let phone = req.body.phone;
            let option = req.body.option;
            if (!id || !username || !password || !name || !address || !city ||  !phone || !option ) {
                console.log("Missing")
                return res.json("Missing params");
            }
            
            while(true) {
                let check = await db.Account.findOne({
                    where: {
                        id
                    }
                })
                if (check) {
                    id = Math.floor(Math.random() * 1000000000);
                } else {
                    break;
                }
            } 
            
            req.body.id = id;
            next();
        }catch(err) {
            return res.status(500).json("Lỗi server!")
        }
    },

    //Kiểm tra thêm mới người dùng
    createNewProduct: async(req, res, next) => {
        try {
            let id = req.body.id;
            let product = req.body.product;
            let productdetail = req.body.productdetail
            let avatar = req.body.avatar;
            if (!id || !product || !productdetail || !avatar) {
                return res.status(400).json({
                    errCode: 1,
                    msg: "Missing params"
                })
            }
            while(true) {
                let check = await db.Product.findOne({
                    where: {
                        productCode: id
                    }
                })
                if (check) {
                    id = Math.floor(Math.random() * 1000000000);
                } else {
                    break;
                }
            }
            req.body.id = id;
            next();

        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!")
        }
    }

}