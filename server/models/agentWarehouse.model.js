module.exports = (db) => {
    const {DataTypes, NOW} = require('sequelize');
    const AgentWarehouse = db.define('agentwarehouse', {
      // Model attributes are defined here
      
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      batchCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }, 
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      quantityImported: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Đen',
        primaryKey: true
      },
      quantitySold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
      },
      createAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: NOW
      }
    }, {
        timestamps: false
    });
    return AgentWarehouse;
  }