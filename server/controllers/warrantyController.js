const db = require('../models/index');
const sequelize = require('sequelize');
class customerController {

    //lấy tất cả các hoạt động của trung tâm
    async getAllActions(req, res) {
        try {
            const wcCode = req.user.id;
            let data = await db.Warranty.findAll({
                where: {
                    wcCode
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg:'Lấy thông tin hoạt động của trung tâm thành công!',
                data
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                errCode: 1,
                msg: "Lỗi server"
            })
        }
    }

    //Gửi sản phẩm lại cho đại lý
    async sendProductToAgent(req, res) {
        try{
            const data = req.body.data;
            const warrantyCode = req.params.id;
            await db.Warranty.update({
                status: 'Hoàn tất',
                finishAt: sequelize.fn('NOW'),
                note: data.note
            }, {
                where: {
                    warrantyCode: warrantyCode
                }
            })
            await db.CustomerProduct.update({
                status: 'Active'
            }, {
                where: {
                    model: data.model
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Gửi sản phẩm về đại lý thành công!' 
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Gửi sản phẩm về cơ sở sản xuất
    async sendProductToFactory(req, res) {
        try{
            const warrantyCode = req.params.id;
            const factoryCode = req.body.data.factoryCode;
            const model = req.body.data.model;
            const productCode = req.body.data.productCode;
            const note = req.body.data.note;
            const status = req.body.data.status;
            
            await db.FaultyProduct.create({
                errCode: Date.now() % 10000001,
                productCode,
                factoryCode,
                wcCode: req.user.id,
                model,
                status: "Sản phẩm lỗi",
                createAt: sequelize.fn('NOW'),
                note
            });
            await db.Warranty.update({
                status: "Sản phẩm lỗi",
                finishAt: sequelize.fn('NOW')
            }, {
                where: {
                    warrantyCode: warrantyCode
                }
            })
            await db.CustomerProduct.update({
                status: "Sản phẩm lỗi"
            }, {
                where: {
                    model
                }
            })
            return res.status(200).json({
                errCode: 0,
                msg: 'Gửi sản phẩm về nhà máy thành công!' 
            })
        }catch(err) {
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    }

    //Phân tích sản phẩm sản xuất
    async analyzQuantityWarranty(req, res) {
        try{
            const wcCode = req.user.id;
            const type = req.query.type;
            const d = new Date();
            const year = d.getFullYear();
            let finished = "Hoàn tất";
            let working = "Đang sửa chữa";
            let faulty = "Sản phẩm lỗi";
            if (type === "month" || type === "quarter") {
                let data = await db.Warranty.findAll({
                    where: {
                        createdAt: sequelize.where(
                          sequelize.fn("YEAR", sequelize.col("createAt")),
                          year),
                        wcCode
                      },
                      attributes: [
                        'status',
                        [sequelize.fn("MONTH", sequelize.col("createAt")), "month"],
                        [sequelize.fn('COUNT', sequelize.col('warrantyCode')), 'count']
                      ],
                      group: ["month", "status"],
                      raw: true
                })
                let result = [];
                
                for (let i = 1; i <= 12; i++) {
                    let obj = {};
                    obj.month = i;
                    obj.finished = 0;
                    obj.working = 0;
                    obj.faulty = 0;
                    for (let j in data) {
                        if (data[j].month === i) { 
                            if (data[j].status === finished) {
                                obj.finished += parseInt(data[j].count);
                            } else if (data[j].status === working) {
                                obj.working += parseInt(data[j].count);
                            } else if (data[j].status === faulty) {
                                obj.faulty += parseInt(data[j].count)
                            }
                        }
                    }
                    obj.month = "Tháng " + i;
                    result.push(obj);
                    obj = {};
                    obj.finished = 0;
                    obj.working = 0;
                    obj.faulty = 0;
                }
                if (type === 'quarter') {
                    let arr = [];
                    let finished = 0;
                    let working = 0;
                    let faulty = 0;
                    let k = 1;
                    for (let i = 0; i < 12; i++) {
                        finished += parseInt(result[i].finished);
                        working += parseInt(result[i].working);
                        faulty += parseInt(result[i].faulty);
                        if (i === 2 || i === 5 || i === 8 || i === 11) {
                            let obj = {};
                            obj.finished = finished;
                            obj.working = working;
                            obj.faulty = faulty;
                            obj.quarter = "Quý " + k;
                            k++;
                            finished = 0;
                            working = 0;
                            faulty = 0;
                            arr.push(obj);
                        }
                    }
                    return res.status(200).json({
                        errCode: 0,
                        msg: 'Lấy thống kê sản phẩm bảo hành theo tháng thành công!',
                        data: arr
                    })
                }
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Lấy thống kê sản phẩm bảo hành theo tháng thành công!',
                    data: result
                })
            }
            else if (type === 'year') {
                let data = await db.Warranty.findAll({
                    where: {
                        wcCode
                      },
                      attributes: [
                        'status',
                        [sequelize.fn("YEAR", sequelize.col("createAt")), "year"],
                        [sequelize.fn('COUNT', sequelize.col('warrantyCode')), 'count']
                      ],
                      group: ["year", "status"],
                      raw: true
                })
                let result = [];
                for (let i = year - 3; i <= year; i++) {
                    let obj = {};
                    obj.year = i;
                    obj.finished = 0;
                    obj.working = 0;
                    obj.faulty = 0;
                    for (let j in data) {
                        if (data[j].year === i) { 
                            if (data[j].status === finished) {
                                obj.finished += parseInt(data[j].count);
                            } else if (data[j].status === working) {
                                obj.working += parseInt(data[j].count);
                            } else if (data[j].status === faulty) {
                                obj.faulty += parseInt(data[j].count)
                            }
                        }
                    }
                    obj.year = "Năm " + i;
                    result.push(obj);
                    // obj = {};
                    // obj.finished = 0;
                    // obj.working = 0;
                    // obj.faulty = 0;
                }
                return res.status(200).json({
                    errCode: 0,
                    msg: 'Lấy thống kê sản phẩm bảo hành theo năm thành công!',
                    data: result
                })
            }
            
        }catch(err){
            console.log(err);
            return res.status(500).json("Lỗi server!");
        }
    } 
    
}
module.exports = new customerController;