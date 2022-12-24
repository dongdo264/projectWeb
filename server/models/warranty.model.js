module.exports = (db) => {
    const {DataTypes, NOW} = require('sequelize');
    const Warranty = db.define('warranty', {
      // Model attributes are defined here
      warrantyCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      wcCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      finishAt: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(4000),
        allowNull: true
      },
      note: {
        type: DataTypes.STRING(4000),
        allowNull: false,
        defaultValue: 'Không'
      }
    }, {
        timestamps: false
    });
    return Warranty;
  }