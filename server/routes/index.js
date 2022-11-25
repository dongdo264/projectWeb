const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
function route(app) {
    app.use("/api-auth", authRouter);
    app.use("/api-user", userRouter);
    app.use("/api-admin", adminRouter);
}
module.exports = route;