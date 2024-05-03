const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Condition = require('./Condition');
const User = require('./User');
const Category = require('./Category');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  conditionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Condition,
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'uid',
    },
  },
  wishlist: {
    type: DataTypes.TEXT,
    allowNull: true,
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

User.hasMany(Item, {
  foreignKey: 'uid',
});
Item.belongsTo(User, {
  foreignKey: 'uid',
});

Condition.hasMany(Item, {
  foreignKey: 'conditionId',
});
Item.belongsTo(Condition, {
  foreignKey: 'conditionId',
});

Category.hasMany(Item, {
  foreignKey: 'categoryId',
});
Item.belongsTo(Category, {
  foreignKey: 'categoryId',
});

module.exports = Item;