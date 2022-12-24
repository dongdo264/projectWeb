const db = require('../models/index');
const sequelize = require('sequelize');
class customerController {

    //LẤY TẤT CẢ ĐẠI LÝ
    async order(req, res) {
        try {
            const customer = req.body.customer;
            const data = req.body.data;
            
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

   
}
module.exports = new customerController;