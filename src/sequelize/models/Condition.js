const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Condition = sequelize.define('Condition', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Condition;