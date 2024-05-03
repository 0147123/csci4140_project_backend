const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./Item');
const User = require('./User');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: 'id',
    },
  },
  availableItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: 'id',
    },
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'uid',
    },
  },
  status : {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Request.belongsTo(Item, { foreignKey: 'itemId', as: 'item' });
Request.belongsTo(Item, { foreignKey: 'availableItemId', as: 'availableItem'});
Request.belongsTo(User, { foreignKey: 'uid' });

Item.hasMany(Request, { foreignKey: 'itemId' });
Item.hasMany(Request, { foreignKey: 'availableItemId' });
User.hasMany(Request, { foreignKey: 'uid' });

module.exports = Request;