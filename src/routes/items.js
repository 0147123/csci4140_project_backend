const express = require('express');
const router = express.Router();
const Item = require('../sequelize/models/Item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items.' });
  }
});

// Get an item by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch item.' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  const { name, description, condition, image, userId, wishlist } = req.body;

  try {
    const item = await Item.create({ name, description, condition, image, userId, wishlist });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item.' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, condition, image, userId, wishlist } = req.body;

  try {
    const item = await Item.findByPk(id);
    item.name = name;
    item.description = description;
    item.condition = condition;
    item.image = image;
    item.userId = userId;
    item.wishlist = wishlist;
    await item.save();

    res.json(item);
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

    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item.' });
  }
});

module.exports = router;