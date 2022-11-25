const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    unique: true
  },
  calldate: Sequelize.STRING,
  calltime: Sequelize.STRING
});

module.exports = Customer;