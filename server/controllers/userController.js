const db = require('../models/index');
const sequelize = require('sequelize');
class userController {
    async getProfileUserById(req, res) {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(200).json({
                    errCode: 2,
                    msg: "Missing params"
                })
            } else {
                const data = await db.Account.findOne({
                    where: {
                        id: id
                    }
                })
                let infoUser = null;
                let role = null;
                if (data.role === 3) {
                    infoUser = await db.DistributionAgent.findOne({
                        where: {
                            agentCode: id
                        },
                        attributes: [
                            ['agentCode', 'id'],
                            ['agentName', 'name'],
                            ['agentAdress', 'adress'],
                            ['agentCity', 'city'],
                            ['agentPhone', 'phone'],
                            'avatar',
                            'email'
                        ]
                    })
                    role = 'Đại lý phân phối';
                } else if (data.role === 2) {
                    infoUser = await db.WarrantyCenter.findOne({
                        where: {
                            wcCode: id
                        },
                        attributes: [
                            ['wcCode', 'id'],
                            ['wcName', 'name'],
                            ['wcAdress', 'adress'],
                            ['wcCity', 'city'],
                            ['wcPhone', 'phone'],
                            'avatar',
                            'email'
                        ]
                    })
                    role = 'Trung tâm bảo hành';
                } else if (data.role === 1) {
                    infoUser = await db.Factory.findOne({
                        where: {
                            factoryCode: id
                        },
                        attributes: [
                            ['factoryCode', 'id'],
                            ['factoryName', 'name'],
                            ['factoryAdress', 'adress'],
                            ['factoryCity', 'city'],
                            ['factoryPhone', 'phone'],
                            'avatar',
                            'email'
                        ]
                    })
                    role = 'Cơ sở sản xuất';
                }
                return res.status(200).json({
                    errCode: 0,
                    msg: "Get info user successfully",
                    infoUser,
                    role
                })
            }
        }catch(err) {
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }
    async getInfoProductById(req, res) {
        try {
            const id = req.params.id;
            let data = await db.Productdetail.findOne({
                where: {
                    productCode: id
                },
                include: [
                    {
                        model: db.Product,
                        attributes: ['productName', 'productLine', 'avatar']
                    }
                ]
            })
            if (data) {
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Lấy thông tin sản phẩm thành công!',
                    data
                })
            } else {
                return res.status(404).json({
                    msg: 'Không tìm thấy info sản phẩm này!',
                    errCode: 2
                })
            }
        } catch(err){
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

        //Lấy thông tin các sản phẩm
    async getAllProducts(req, res) {
        try{
            let data = await db.Product.findAll({
                    raw: true,
                })
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Lấy thông tin sản phẩm thành công!',
                    data
                })
        }catch(err) {
                console.log(err);
                return res.status(500).json({
                    errCode: 1,
                    msg: 'Lỗi server'
                })
            }
    }

        //LẤY TẤT CẢ ĐẠI LÝ
        async getAllAgents(req, res) {
            try {
                let data = await db.DistributionAgent.findAll({
                    raw: true,
                    include: [{
                        model: db.Account,
                        attributes: ['status'],
                        where: {
                            status: {
                              [sequelize.Op.not]: 'deleted'
                            }
                        },
                    }
                    ],
                   
                    nest: true
                })
                return res.status(200).json({
                    errCode: 0,
                    msg: "Lấy thông tin agents thành công",
                    data
                })
            }catch(err) {
                console.log(err);
                return res.status(500).json({
                    errCode: 0,
                    msg: "Lỗi server"
                })
            }
        }
    
        // LẤY TẤT CẢ TRUNG TÂM BẢO HÀNH
        async getAllWarrantyCenter(req, res) {
            try {
                let data = await db.WarrantyCenter.findAll({
                    raw: true,
                    include: [{
                        model: db.Account,
                        attributes: ['status'],
                        where: {
                            status: {
                              [sequelize.Op.not]: 'deleted'
                            }
                        },
                    }
                    ],
                    
                    nest: true
                })
                return res.status(200).json({
                    errCode: 0,
                    msg: "Lấy thông tin trung tâm bảo hành thành công",
                    data
                })
            }catch(err) {
                console.log(err);
                return res.status(500).json({
                    errCode: 1,
                    msg: "Lỗi server"
                })
            }
        }
    
        //LẤY THÔNG TIN TẤT CẢ NHÀ MÁY
        async getAllFactories(req, res) {
            try {
                let data = await db.Factory.findAll({
                    raw: true,
                    include: [{
                        model: db.Account,
                        attributes: ['status'],
                        where: {
                            status: {
                              [sequelize.Op.not]: 'deleted'
                            }
                        },
                    }
                    ],
                    
                    nest: true
                })
                return res.status(200).json({
                    errCode: 0,
                    msg: "Lấy thông tin các nhà máy thành công",
                    data
                })
            }catch(err) {
                console.log(err);
                return res.status(500).json({
                    errCode: 1,
                    msg: "Lỗi server"
                })
            }
        }

        async getAllProductLines(req, res) {
            try{
                let data = await db.ProductLine.findAll({
                    raw: true
                })
                return res.status(200).json({
                    errCode: 0,
                    msg: "Lấy thông tin các dòng sản phẩm",
                    data
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
module.exports = new userController;