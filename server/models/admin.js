module.exports = (db) => {
    const {DataTypes} = require('sequelize');
    const Admin = db.define('admins', {
      // Model attributes are defined here
      adminCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      adminName: {
        type: DataTypes.STRING,
        defaultValue: 'N/A'
      },
      adminAdress: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
      },
      adminCity: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
      },
      adminPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
      },
      avatar: {
        type: DataTypes.BLOB('long'),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
      }
    }, {
        timestamps: false
    });
    return Admin;
  }