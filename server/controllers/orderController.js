const db = require('../models/index');
const sequelize = require('sequelize');
class orderController {
    //Lấy thông tin đơn hàng
    async getInfoOrder (req, res) {
        try {
            const orderNumber = req.query.orderNumber;
            let data = await db.Order.findOne({
                where: {
                    orderNumber
                },
                include: [{
                    model: db.OrderDetail
                }]
            })
            console.log(data);
            if (!data) {
                return res.status(400).json("Không tìm thấy đơn hàng!")
            }
            let factory = await db.Factory.findOne({
                where: {
                    factoryCode: data.factoryCode
                }
            })
            let agent = await db.DistributionAgent.findOne({
                where: {
                    agentCode: data.agentCode
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: "Lấy thông tin đơn hàng thành công!",
                data,
                factory, 
                agent
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }
   
}
module.exports = new orderController;