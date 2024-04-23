const { Op } = require("sequelize");
const Category = require("../sequelize/models/Category");
const Condition = require("../sequelize/models/Condition");
const Item = require("../sequelize/models/Item");
const Request = require("../sequelize/models/Request");
const User = require("../sequelize/models/user");
const Notification = require("../sequelize/models/Notification");

const getRequests = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { uid } = req.query;
    const requests = await Request.findAll({
      where: {
        itemId,
        uid: uid ? uid : { [Op.not]: null },
      },
      include: [
        {
          model: Item,
          as: 'availableItem',
          attributes: ['name', 'image'],
          include: [
            {
              model: User,
              attributes: ['uid', 'username'],
            },
          ],
        },

      ],
    });
    res.status(200).json({ requests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch requests.' });
  }
}

const getRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findByPk(id, {
      include: [
        {
          model: Item,
          as: 'availableItem',
          include: [
            {
              model: User,
              attributes: ['uid', 'username'],
            },
            {
              model: Condition,
              attributes: ['name', 'value'],
            },
            {
              model: Category,
              attributes: ['id', 'name', 'value'],
            }
          ],
        },
      ],
    });
    res.status(200).json({ request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch request.' });
  }
}

const createRequest = async (req, res) => {
  const { uid, itemId, availableItemIds } = req.body;

  try {
    availableItemIds.forEach(async (id) => {
      await Request.create({
        uid,
        itemId,
        availableItemId: id,
      });
    });

    const item = await Item.findByPk(itemId);
    const user = await User.findByPk(uid);

    await Notification.create({
      content: 'You have a new request on your item ' + item.name + ' from ' + user.username,
      uid: item.uid,
    });

    res.status(201).json({ message: 'Request created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create request.' });
  }
}

const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findByPk(id);
    const item = await Item.findByPk(request.itemId,
      {
        include: [
          {
            model: User,
            attributes: ['uid', 'username'],
          },
        ],
      });
    const availableItem = await Item.findByPk(request.availableItemId);

    if (status === 'accepted') {
      item.status = 'requested';
      availableItem.status = 'requested';
      request.status = 'accepted';
    } else {
      request.status = 'rejected';
    }

    await request.save();
    await item.save();
    await availableItem.save();

    const result = await Request.findByPk(id, {
      include: [
        {
          model: Item,
          as: 'availableItem',
          include: [
            {
              model: User,
              attributes: ['uid', 'username'],
            },
            {
              model: Condition,
              attributes: ['name', 'value'],
            },
            {
              model: Category,
              attributes: ['id', 'name', 'value'],
            }
          ],
        },
      ],
    });

    if (status === 'accepted') {
      await Notification.create({
        content: 'Your request on the item ' + item.name + ' has been accepted by ' + item.User.username,
        uid: request.uid,
      });
    } else {
      await Notification.create({
        content: 'Your request on the item ' + item.name + ' has been rejected by ' + item.User.username,
        uid: request.uid,
      });
    }

    res.status(200).json({ request: result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to accept request.' });
  }
}

const updateRequest = async (req, res) => {
  const { uid, itemId, availableItemIds } = req.body;

  try {
    const requests = await Request.findAll({
      where: { uid, itemId },
    });

    requests.forEach(async (request) => {
      await request.destroy();
    });

    availableItemIds.forEach(async (id) => {
      await Request.create({
        uid,
        itemId,
        availableItemId: id,
      });
    });

    const item = await Item.findByPk(itemId);
    const user = await User.findByPk(uid);

    await Notification.create({
      content: 'You have a new request on your item ' + item.name + ' from ' + user.username,
      uid: item.uid,
    });

    res.status(200).json({ message: 'Requests updated'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update requests.' });
  }
}

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findByPk(id);
    await request.destroy();

    res.status(200).json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete request.' });
  }
}


module.exports = {
  getRequests,
  getRequest,
  createRequest,
  updateRequestStatus,
  updateRequest,
  deleteRequest,
};