const express = require('express');
const router = express.Router();
const Comment = require('../sequelize/models/Comment');

// Get all comments
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: { postId: id },
    });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments.' });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  const { uid, itemId, rating, image } = req.body;

  try {
    const comment = await Comment.create({ uid, itemId, rating, image });
    res.status(201).json({comment});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment.' });
  }

});

// Update a comment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { uid, itemId, rating, image } = req.body;

  try {
    const comment = await Comment.findByPk(id);
    comment.uid = uid;
    comment.itemId = itemId;
    comment.rating = rating;
    comment.image = image;
    await comment.save();

    res.status(200).json({comment});
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment.' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);
    await comment.destroy();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment.' });
  }
});

module.exports = router;