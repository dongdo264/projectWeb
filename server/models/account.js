module.exports = (db = require('../config/connectDB')) => {
  const {DataTypes} = require('sequelize');
  const Account = db.define('accounts', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
      timestamps: false
  });
  return Account;
}