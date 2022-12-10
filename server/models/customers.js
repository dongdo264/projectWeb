module.exports = (db) => {
  const {DataTypes } = require('sequelize');
  const Customer = db.define('customers', {
    
    // Model attributes are defined here
    customerCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerDob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerAdress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerStatus: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      timestamps: false
  });
  return Customer;
}