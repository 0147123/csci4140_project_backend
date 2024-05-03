const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Conversation = require('./Conversation');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'uid',
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Conversation,
      key: 'id',
    },
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

Message.belongsTo(User, { foreignKey: 'uid' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

User.hasMany(Message, { foreignKey: 'uid' });
Conversation.hasMany(Message, { foreignKey: 'conversationId' });





module.exports = Message;