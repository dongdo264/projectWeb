const db = require('../models/index');
module.exports = {
    checkProduction: async (req, res, next) => {
        try {
            const id = req.body.id;
            const batchCode = req.body.batchCode;
            const quantity = req.body.quantity;
            const color = req.body.color;
            const factoryCode = req.user.id;

            // if (!id || !batchCode || !quantity || !color || !factoryCode) {
            //     return res.status(400).json({
            //         errCode: 4,
            //         msg: 'Missing params!'
            //     })
            // }
            let checkFactory = await db.Factory.findOne({
                where: {
                    factoryCode
                }
            })
            if (!checkFactory) {
                return res.status(404).json({
                    errCode: 3,
                    msg: 'Không tồn tại cơ sở này!'
                })
            }
            let checkCode = await db.Production.findOne({  
                where: {
                    batchCode
                }
            })
            if (checkCode) {
                return res.status(409).json({
                    errCode: 5,
                    msg: 'Đã tồn tại mã lô hàng này!'
                })
            }
            let checkId = await db.Product.findOne({
                where: {
                    productCode: id
                }
            })
            if (!checkId) {
                return res.status(409).json({
                    errCode: 6,
                    msg: 'Không tồn tại sản phẩm này!'
                })
            }
            next();
        }catch(err) {
            return res.status(500).json("Lỗi server!")
        }
    }
}