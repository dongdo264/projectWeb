const db = require('../models/index');
const sequelize = require('sequelize');
class agentController {

    //LẤY TẤT CẢ ĐẠI LÝ
    async order(req, res) {
        try {
            const agentCode = req.user.id;
            const data = req.body.data;
            const factoryCode = req.body.factoryCode;
            const orderNumber = Date.now() % 100000000;
            await db.Account.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
            await db.Order.create({
                orderNumber,
                agentCode,
                factoryCode,
                status: 'Pending'
            })
            for (let index = 0; index < data.length; index++) {
                await db.OrderDetail.create({
                    orderNumber,
                    productCode: data[index].productCode,
                    quantity: data[index].quantity,
                    color: data[index].color
                })
            }
            await db.Account.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }
   
}
module.exports = new agentController;