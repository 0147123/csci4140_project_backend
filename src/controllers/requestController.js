const Item = require("../sequelize/models/Item");
const Request = require("../sequelize/models/Request");
const User = require("../sequelize/models/user");

const getRequests = async (req, res) => {
  try {
    const { itemId } = req.params;
    const requests = await Request.findAll({
      where: { itemId },
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

const acceptRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findByPk(id);
    const item = await Item.findByPk(request.itemId);
    const availableItem = await Item.findByPk(request.availableItemId);

    item.status = 'requested';
    availableItem.status = 'requested';
    request.status = 'accepted';

    await item.save();
    await availableItem.save();

    res.status(200).json({ message: 'Request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept request.' });
  }
}

const rejectRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findByPk(id);
    request.status = 'rejected';
    await request.save();

    res.status(200).json({ message: 'Request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject request.' });
  }
}

const createRequest = async (req, res) => {
  const { uid, itemId, availableItemId } = req.body;

  try {
    const request = await Request.create({ 
      uid, 
      itemId, 
      availableItemId,
     });
    res.status(201).json({request});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create request.' });
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
  createRequest,
  deleteRequest,
};