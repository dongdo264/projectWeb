module.exports = (db = require('../config/connectDB')) => {
  const {DataTypes } = require('sequelize');
  const User = db.define('users', {
    
    // Model attributes are defined here
    userCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userDob: {
      type: DataTypes.STRING
    },
    userAdress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userStatus: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      timestamps: false
  });
  return User;
}