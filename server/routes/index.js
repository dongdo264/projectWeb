const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const factoryRoutes = require("./factory.route");
const warrantyRoutes = require("./warranty.route")
const agentRoutes = require("./agent.route");
const orderRoutes = require("./order.route")
const customerRoutes = require("./customer.route")
const { verifyTokenAndAdmin,
    verifyTokenAndAgent,
    verifyTokenAndFatory,
    verifyTokenAndWcCenter,
    verifyToken } = require('../middleware/verifyToken');
function route(app) {
    app.use("/api-auth", authRouter);
    app.use("/api-user",verifyToken, userRouter)
    app.use("/api-admin",verifyTokenAndAdmin, adminRouter);
    app.use("/api-factory", verifyTokenAndFatory, factoryRoutes);
    app.use("/api-agent", verifyTokenAndAgent, agentRoutes);
    app.use("/api-warranty", verifyTokenAndWcCenter, warrantyRoutes)
    app.use("/api-order", verifyToken, orderRoutes);
    app.use("/api-customer", verifyTokenAndAgent, customerRoutes)
}

module.exports = route;