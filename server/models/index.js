let db = require('../config/connectDB');
const Account = require('./account');
const Customer = require('./customers');
const AgentWarehouse = require('./agentWarehouse');
const DistributionAgent = require('./distributionAgent');
const Factory = require('./factory');
const Product = require('./product');
const ProductLine = require('./productline');
const WarrantyCenter = require('./warrantyCenter');
const CustomerProduct = require('./customer_product');
const Production = require('./production');
const Productdetail = require('./productdetails');
const Warranty = require('./warranty');

const account = Account(db);
const customer = Customer(db);
const agentWarehouse = AgentWarehouse(db);
const distributionAgent = DistributionAgent(db);
const factories = Factory(db);
const product = Product(db);
const productLine = ProductLine(db);
const warrantyCenter = WarrantyCenter(db);
const customer_product = CustomerProduct(db);
const production = Production(db);
const productdetails = Productdetail(db);
const warranty = Warranty(db);

account.hasOne(distributionAgent, {
    foreignKey: "agentCode"
});
distributionAgent.belongsTo(account, {
    foreignKey: "agentCode",
    targetKey: "id",
});

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


db.sync({alter: true});

module.exports = {
    Account: account, 
    Customer: customer,
    AgentWarehouse: agentWarehouse,
    DistributionAgent: distributionAgent,
    Factory: factories,
    Product: product,
    ProductLine: productLine,
    WarrantyCenter: warrantyCenter,
    CustomerProduct: customer_product,
    Production: production,
    Productdetail: productdetails,
    Warranty: warranty
}