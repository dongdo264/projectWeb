module.exports = (db) => {
  const {DataTypes, NOW } = require('sequelize');
  const Customer = db.define('customers', {
    
    // Model attributes are defined here
    customerCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    agentCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.BLOB('long'),
    },
    createAt: {
      type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
    }
  }, {
      timestamps: false
  });
  return Customer;
}