module.exports = (db) => {
    const {DataTypes} = require('sequelize');
    const Orderdetail = db.define('orderdetails', {
      // Model attributes are defined here
      
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Đen',
        primaryKey: true
      }
    }, {
        timestamps: false
    });
    return Orderdetail;
  }