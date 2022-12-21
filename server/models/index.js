let db = require('../config/connectDB');
const account = require('./account.model')(db);
const customer = require('./customers.model')(db);
const agentWarehouse = require('./agentWarehouse.model')(db);
const distributionAgent = require('./distributionAgent.model')(db);
const factories = require('./factory.model')(db);
const product = require('./product.model')(db);
const productLine = require('./productline.model')(db);
const warrantyCenter = require('./warrantyCenter.model')(db);
const customer_product = require('./customer_product.model')(db);
const production = require('./production.model')(db);
const productdetails = require('./productdetails.model')(db);
const warranty = require('./warranty.model')(db);
const admin = require('./admin.model')(db);
const order = require('./order.model')(db);
const orderdetails = require('./orderdetails.model')(db);

account.hasOne(distributionAgent, {
    foreignKey: "agentCode"
});
distributionAgent.belongsTo(account, {
    foreignKey: "agentCode",
    targetKey: "id",
});

account.hasOne(admin, {
    foreignKey: 'adminCode'
})
admin.belongsTo(account, {
    foreignKey: "adminCode",
    targetKey: "id",
})
account.hasOne(factories, {
    foreignKey: 'factoryCode'
})
factories.belongsTo(account, {
    foreignKey: "factoryCode",
    targetKey: "id"
})

account.hasOne(warrantyCenter, {
    foreignKey: "wcCode"
})
warrantyCenter.belongsTo(account, {
    foreignKey: "wcCode",
    targetKey: "id"
})


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

agentWarehouse.hasMany(product, {
    foreignKey: 'productCode',
    otherKey: 'batchCode'
})
product.belongsToMany(agentWarehouse, {
    foreignKey: 'productCode',
    through: production,
    otherKey: 'batchCode'
})


customer.hasMany(product, {
    foreignKey: 'productCode',
    otherKey: 'customerCode'
})

product.belongsToMany(customer, {
    foreignKey: 'productCode', 
    through: customer_product,
    otherKey: 'customerCode'
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

warrantyCenter.hasMany(warranty, {
    foreignKey: 'wcCode'
})
warranty.belongsTo(warrantyCenter, {
    foreignKey: 'wcCode',
    targetKey: 'wcCode'
})

order.hasMany(orderdetails, {
    foreignKey: 'orderNumber'
})
orderdetails.belongsTo(order, {
    foreignKey: 'orderNumber',
    targetKey: 'orderNumber'
})


db.sync({alter: true});

module.exports = {
    Account: account, 
    Customer: customer,
    Admin: admin,
    AgentWarehouse: agentWarehouse,
    DistributionAgent: distributionAgent,
    Factory: factories,
    Product: product,
    ProductLine: productLine,
    WarrantyCenter: warrantyCenter,
    CustomerProduct: customer_product,
    Production: production,
    Productdetail: productdetails,
    Warranty: warranty,
    Order: order,
    OrderDetail: orderdetails
}