const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uid1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'uid',
    },
  },
  uid2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'uid',
    },
  },
});

Conversation.belongsTo(User, { foreignKey: 'uid1', as: 'user1' });
Conversation.belongsTo(User, { foreignKey: 'uid2', as: 'user2' });

User.hasMany(Conversation, { foreignKey: 'uid1' });
User.hasMany(Conversation, { foreignKey: 'uid2' });


module.exports = Conversation;