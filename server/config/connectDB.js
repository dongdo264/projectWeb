const { Sequelize } = require('sequelize');


//Passing parameters separately (other dialects)
const db = new Sequelize('dev_int3306', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports = db;