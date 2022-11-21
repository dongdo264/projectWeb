let db = require('../config/connectDB');
const Account = require('./account');
const User = require('./user');
const AgentWarehouse = require('./agentWarehouse');
const DistributionAgent = require('./distributionAgent');
const Factory = require('./factory');
const Product = require('./product');
const ProductLine = require('./productline');
const WarrantyCenter = require('./warrantyCenter');
const Order = require('./order');
const OrderDetail = require('./orderdetail');
const CustomerProduct = require('./customer_product');
const Production = require('./production');
const Productdetail = require('./productdetails');

const account = Account(db);
const user = User(db);
const agentWarehouse = AgentWarehouse(db);
const distributionAgent = DistributionAgent(db);
const factories = Factory(db);
const product = Product(db);
const productLine = ProductLine(db);
const warrantyCenter = WarrantyCenter(db);
const order = Order(db);
const orderdetail = OrderDetail(db);
const customer_product = CustomerProduct(db);
const production = Production(db);
const productdetails = Productdetail(db);

user.hasOne(account, {
    foreignKey: "id"
});
account.belongsTo(user, {
    foreignKey: "id",
    targetKey: "userCode",
});

productLine.hasMany(product, {
    foreignKey: 'productLine'
});
product.belongsTo(productLine, {
    foreignKey: 'productLine',
    targetKey: 'productLine'
});


distributionAgent.hasMany(agentWarehouse, {
    foreignKey: 'agentCode'
})
agentWarehouse.belongsTo(distributionAgent, {
    foreignKey: 'agentCode',
    targetKey: 'agentCode'
})

distributionAgent.hasMany(product, {
    foreignKey: 'productCode',
    otherKey: 'agentCode'
})
product.belongsToMany(distributionAgent, {
    foreignKey: 'productCode',
    through: agentWarehouse,
    otherKey: 'agentCode'
})

 

user.hasMany(product, {
    foreignKey: 'productCode',
    otherKey: 'userCode'
})

product.belongsToMany(user, {
    foreignKey: 'productCode',
    through: customer_product,
    otherKey: 'userCode'
})

user.hasMany(order, {
    foreignKey: 'userCode'
})
order.belongsTo(user, {
    foreignKey: 'userCode',
    targetKey: 'userCode'
})

order.hasMany(product, {
    foreignKey: 'productCode',
    otherKey: 'orderCode'
})
product.belongsToMany(order, {
    foreignKey: 'productCode',
    through: orderdetail,
    otherKey: 'orderCode'
})

order.hasMany(orderdetail, {
    foreignKey: 'orderCode'  
})
orderdetail.belongsTo(order, {
    foreignKey: 'orderCode',
    targetKey: 'orderCode'
}) 

factories.hasMany(product, {
    foreignKey: 'productCode',
    otherKey: 'factoryCode'
})
product.belongsToMany(factories, {
    foreignKey: 'productCode',
    through: production,
    otherKey: 'factoryCode'
})

factories.hasMany(production, {
    foreignKey: 'factoryCode'
})
production.belongsTo(factories, {
    foreignKey: 'factoryCode',
    targetKey: 'factoryCode'
})

product.hasOne(productdetails, {
    foreignKey: 'productCode'
})
productdetails.belongsTo(product, {
    foreignKey: 'productCode',
    targetKey: 'productCode'
})

db.sync({alter: true});

module.exports = {
    Account: account, 
    User: user,
    AgentWarehouse: agentWarehouse,
    DistributionAgent: distributionAgent,
    Factory: factories,
    Product: product,
    ProductLine: productLine,
    WarrantyCenter: warrantyCenter,
    Order: order,
    OrderDetail: orderdetail,
    CustomerProduct: customer_product,
    Production: production,
    Productdetail: productdetails
}