const db = require('../models/index');
module.exports = {
    //Kiểm tra Thêm user
    createNewCustomer: async (req, res, next) => {
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

}