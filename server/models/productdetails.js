module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const Productdetail = db.define('productdetails', {
      // Model attributes are defined here
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      productRam: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '4GB'
      },
      productDetail1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productDetail2: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productDetail3: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productDetail4: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return Productdetail;
  }