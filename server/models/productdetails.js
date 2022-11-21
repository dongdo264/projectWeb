module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const Productdetail = db.define('productdetails', {
      // Model attributes are defined here
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '99KG'
      },
      frame: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shock: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
      },
      rims: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tires: {
        type: DataTypes.STRING,
        allowNull: true
      },
      handlebar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      saddle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pedals: {
        type: DataTypes.STRING,
        allowNull: true
      },
      brakes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Trọng lượng có thể thay đổi dựa trên kích cỡ, chất liệu hoàn thiện, chi tiết kim loại và các phụ kiện.'
      }

    }, {
        timestamps: false
    });
    return Productdetail;
  }