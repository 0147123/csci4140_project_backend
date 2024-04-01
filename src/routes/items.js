const express = require('express');
const router = express.Router();
const Item = require('../sequelize/models/Item');
const Condition = require('../sequelize/models/Condition');
const User = require('../sequelize/models/user');

// Get all items
router.get('/', async (req, res) => {
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
});

// Get an item by id
router.get('/:id', async (req, res) => {
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
});

// Create a new item
router.post('/', async (req, res) => {
  const { name, description, condition, image, uid, wishlist } = req.body;

  try {
    const item = await Item.create({ name, description, condition, image, uid, wishlist });
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item.' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, condition, image, uid, wishlist } = req.body;

  try {
    const item = await Item.findByPk(id);
    item.name = name;
    item.description = description;
    item.condition = condition;
    item.image = image;
    item.uid = uid;
    item.wishlist = wishlist;
    await item.save();

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item.' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    await item.destroy();

    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item.' });
  }
});

module.exports = router;