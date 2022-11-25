const db = require('../models/index');
const jwt = require('jsonwebtoken');


let verifyToken = async (req, res, next) => {
    const token = res.headers["accessToken"];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    errCode: 0,
                    msg: "Xác thực không thành công!",
                    auth: false
                })
            } else {
                req.userID = decoded.id;
                next();
            }
        });
    } else {
        res.json({
            errCode: 0,
            msg: "Xác thực không thành công!",
            auth: false
        })
    }
}

module.exports = {
    verifyToken
}