module.exports = (db) => {
    const {DataTypes} = require('sequelize');
    const AgentWarehouse = db.define('agentwarehouse', {
      // Model attributes are defined here
      
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      bathCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantityInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      }
    }, {
        timestamps: false
    });
    return AgentWarehouse;
  }