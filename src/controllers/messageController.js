
const { Op } = require('sequelize');
const Conversation = require('../sequelize/models/Conversation');
const Message = require('../sequelize/models/Message');
const User = require('../sequelize/models/user');

const getConversations = async (req, res) => {
  try {
    const { uid } = req.params;
    const conversations = await Conversation.findAll(
      {
        where:
        {
          [Op.or]: [
            { uid1: uid },
            { uid2: uid },
          ]
        },
        include: [
          {
            model: Message,
            order: [['createdAt', 'DESC']],
            limit: 1,
            attributes: ['content', 'type', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['username', 'icon'],
              },
            ],
          },
          {
            model: User,
            as: 'user1',
            attributes: ['uid', 'username', 'icon'],
          },
          {
            model: User,
            as: 'user2',
            attributes: ['uid', 'username', 'icon'],
          }
        ],
      }
    );
    res.status(200).json({ conversations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch conversations.' });
  }
}

const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.findAll({
      where: { conversationId: id },
      include: [
        {
          model: User,
          attributes: ['username', 'icon'],
        },
      ],
    }

    );
    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
}

const createMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { content, uid, receiver, type } = req.body;

  try {
    const message = await Message.create({
      content,
      conversationId,
      uid,
      type,
    });
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create message.' });
  }

}


module.exports = {
  getConversations,
  getMessages,
  createMessage,
};