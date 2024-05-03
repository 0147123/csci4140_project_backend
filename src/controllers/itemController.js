const { Op } = require('sequelize');
const Category = require('../sequelize/models/Category');
const Condition = require('../sequelize/models/Condition');
const Item = require('../sequelize/models/Item');
const User = require('../sequelize/models/User');
const Request = require('../sequelize/models/Request');
// itemController.js
const getAllItems = async (req, res) => {
  const { categoryId, keyword, status, uid } = req.query;

  try {
    const items = await Item.findAll({
      where: {
        categoryId: categoryId ? categoryId : { [Op.not]: null },
        name: keyword ? { [Op.like]: `%${keyword}%` } : { [Op.not]: null },
        status: status ? status : { [Op.not]: null },
        uid: uid ? uid : { [Op.not]: null },
      },
      attributes: ['id', 'name', 'image', 'createdAt'],
      include: [
        {
          model: Condition,
          attributes: ['name', 'value'],
        },
        {
          model: Category,
          attributes: ['id', 'name', 'value'],
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
          attributes: ['name', 'value'],
        },
        {
          model: Category,
          attributes: ['id', 'name', 'value'],
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

  const { name, description, condition, categoryId, uid, wishlist } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const conditionId = await Condition.findOne({ where: { value: condition } }).then((condition) => condition.id);
    const item = await Item.create({ name, description, conditionId, categoryId, image: req.file.path, uid, wishlist });

    const resultItem = await Item.findByPk(item.id, {
      include: [
        {
          model: Condition,
          attributes: ['name', 'value'],
        },
        {
          model: Category,
          attributes: ['id', 'name', 'value'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(201).json({ item: resultItem });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create item.' });
  }
}

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, condition, categoryId, uid, wishlist } = req.body;

  try {

    const item = await Item.findByPk(id);
    item.name = name;
    item.description = description;
    const conditionId = await Condition.findOne({ where: { value: condition } }).then((condition) => condition.id);
    item.conditionId = conditionId;
    item.categoryId = categoryId;

    if (req.file) {
      item.image = req.file.path;
    }
    item.uid = uid;
    item.wishlist = wishlist;
    await item.save();

    const resultItem = await Item.findByPk(item.id, {
      include: [
        {
          model: Condition,
          attributes: ['name', 'value'],
        },
        {
          model: Category,
          attributes: ['id', 'name', 'value'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json({ item: resultItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item.' });
  }
}

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const requests = await Request.findAll({
      where: { [Op.or]: [{ itemId: id }, { availableItemId: id }] },
    });

    requests.forEach(async (request) => {
      await request.destroy();
    });

    await item.destroy();

    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete item.' });
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'value'],
    });
    res.status(200).json({categories});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch categories.' });
  }
}


module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getAllCategories
};