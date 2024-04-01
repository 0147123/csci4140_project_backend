const Condition = require('../sequelize/models/Condition');
const Item = require('../sequelize/models/Item');
const User = require('../sequelize/models/user');
// itemController.js
const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      attributes: ['id', 'name', 'image', 'createdAt'],
      include: [
        {
          model: Condition,
          attributes: ['name'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch items.' });
  }
};

const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id, {
      include: [
        {
          model: Condition,
          attributes: ['name'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch item.' });
  }
}

const createItem = async (req, res) => {
  const { name, description, condition, uid, wishlist } = req.body;

  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const item = await Item.create({ name, description, condition, image: req.file.path, uid, wishlist });
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item.' });
  }
}

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, condition, uid, wishlist } = req.body;

  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const item = await Item.findByPk(id);
    item.name = name;
    item.description = description;
    item.condition = condition;
    item.image = req.file.path;
    item.uid = uid;
    item.wishlist = wishlist;
    await item.save();

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item.' });
  }
}

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    await item.destroy();

    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item.' });
  }
}


module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};