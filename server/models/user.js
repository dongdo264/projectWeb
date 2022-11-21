module.exports = (db = require('../config/connectDB')) => {
  const {DataTypes } = require('sequelize');
  const User = db.define('users', {
    
    // Model attributes are defined here
    userCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userDob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAdress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userPhone: {
      type: DataTypes.STRING,
      allowNull: true
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