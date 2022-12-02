const db = require('../models/index');
class FactoryController {
    async productions(req, res) {
        try {
            let id = req.body.id;
            let product = req.body.product;
            let productdetail = req.body.productdetail
            let avatar = req.body.avatar;
            console.log(product)
            console.log(productdetail)
            //console.log(avatar)
            if (!product || !productdetail) {
                return res.status(200).json({
                    errCode: 2,
                    msg: "missing body !"
                })
            } else {
                await db.Product.create({
                    productCode: id,
                    productLine: product.productLine,
                    productName: product.productName,
                    buyPrice: product.productPrice,
                    productStatus: product.status,
                    warrantyPeriod: product.warrantyPeriod,
                    avatar
                });
                await db.Productdetail.create({
                    productCode: id,
                    size: productdetail.size,
                    frame: productdetail.frame,
                    shock: productdetail.shock,
                    rims: productdetail.rims,
                    tires: productdetail.tires,
                    handlebar: productdetail.handlebar,
                    saddle: productdetail.saddle,
                    pedals: productdetail.pedals,
                    brakes: productdetail.brakes,
                    weight: productdetail.weight
                })
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Tạo sản phẩm thành công!'
                })  
            }
        }catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: 'Lỗi server'
            })
        }
    }
}
module.exports = new FactoryController;