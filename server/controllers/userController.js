const db = require('../models/index');
const sequelize = require('sequelize');
class userController {
    //Lấy thông tin người dùng theo id
    async getProfileUserById(req, res) {
        try {
            const id = req.params.id;
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
                            ['agentAdress', 'address'],
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
                            ['wcAdress', 'address'],
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
                            ['factoryAdress', 'address'],
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

    //Cập nhật thông tin người dùng
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const role = req.user.role;
            const data = req.body.data;
            if (role === 1) {
                await db.Factory.update({
                    factoryName: data.name,
                    factoryAdress: data.address,
                    factoryCity: data.city,
                    factoryPhone: data.phone,
                    email: data.email,
                    avatar: req.body.avatar
                }, {
                    where: {
                        factoryCode: id
                    }
                })
            } else if (role === 2) {
                await db.WarrantyCenter.update({
                    wcName: data.name,
                    wcAdress: data.address,
                    wcCity: data.city,
                    wcPhone: data.phone,
                    email: data.email,
                    avatar: req.body.avatar
                }, {
                    where: {
                        wcCode: id
                    }
                })
            } else if (role === 3) {
                await db.DistributionAgent.update({
                    agentName: data.name,
                    agentAdress: data.address,
                    agentCity: data.city,
                    agentPhone: data.phone,
                    email: data.email,
                    avatar: req.body.avatar
                }, {
                    where: {
                        agentCode: id
                    }
                })
            }
            return res.status(200).json({
                errCode: 0,
                msg: 'Cập nhật thông tin thành công!'
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Lấy thông tin sản phẩm theo id
    async getInfoProductById(req, res) {
        try {
            const id = req.params.id;
            let data = await db.Product.findOne({
                where: {
                    productCode: id
                },
                include: [
                    {
                        model: db.Productdetail,
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
                    order: [
                        ['createAt', 'DESC'],   
                    ],
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
                    attributes: [
                        '*'   
                    ],
                    include: [
                        {
                        model: db.Product,
                        attributes: [
                            [sequelize.fn('count', sequelize.col('products.productCode')), 'count'],
                        ],
                        
                        }
                    ],
                    raw: true,
                    group: ['productlines.productLine']
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