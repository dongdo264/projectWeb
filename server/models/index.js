const { Sequelize } = require('sequelize');
let db = require('../config/connectDB');
const Account = require('./account');
const User = require('./user');
const AgentWarehouse = require('./agentWarehouse');
const DistributionAgent = require('./distributionAgent');
const Factory = require('./factory');
const Product = require('./product');
const ProductLine = require('./productline');
const WarrantyCenter = require('./warrantyCenter');

const account = Account(db);
const user = User(db);
const agentWarehouse = AgentWarehouse(db);
const distributionAgent = DistributionAgent(db);
const factories = Factory(db);
const product = Product(db);
const productLine = ProductLine(db);
const warrantyCenter = WarrantyCenter(db);

account.hasOne(user, {
    foreignKey: "userCode",
    tergetKey: "id",
});

user.belongsTo(account, {
    foreignKey: "userCode"
});

db.sync({alter: true});

module.exports = {
    Account: account, 
    User: user,
    AgentWarehouse: agentWarehouse,
    DistributionAgent: distributionAgent,
    Factory: factories,
    Product: product,
    ProductLine: productLine,
    WarrantyCenter: warrantyCenter
}