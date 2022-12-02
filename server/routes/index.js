const authRouter = require("./auth");
const adminRouter = require("./admin");
const userRouter = require("./user");
const factoryRoutes = require("./factory");
const { verifyTokenAndAdmin,
    verifyTokenAndAgent,
    verifyTokenAndFatory,
    verifyTokenAndWcCenter } = require('../middleware/verifyToken');
function route(app) {
    app.use("/api-auth", authRouter);
    app.use("/api-user", userRouter)
    app.use("/api-admin",verifyTokenAndAdmin, adminRouter);
    app.use("/api-factory", verifyTokenAndFatory, factoryRoutes);
}

module.exports = route;