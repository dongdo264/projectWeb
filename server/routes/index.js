const authRouter = require("./auth");
const adminRouter = require("./admin");
const { verifyTokenAndAdmin,
    verifyTokenAndAgent,
    verifyTokenAndFatory,
    verifyTokenAndWcCenter } = require('../middleware/verifyToken');
function route(app) {
    app.use("/api-auth", authRouter);
    app.use("/api-admin",verifyTokenAndAdmin, adminRouter);
}

module.exports = route;