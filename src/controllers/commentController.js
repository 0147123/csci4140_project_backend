const Comment = require('../sequelize/models/Comment');

const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: { postId: id },
    });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments.' });
  }
}

const createComment = async (req, res) => {
  const { uid, commentId, rating, image } = req.body;

  try {
    const comment = await Comment.create({ uid, commentId, rating, image });
    res.status(201).json({comment});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment.' });
  }

}

const updateComment = async (req, res) => {
  
  const { id } = req.params;
  const { uid, commentId, rating, image } = req.body;

  try {
    const comment = await Comment.findByPk(id);
    comment.uid = uid;
    comment.commentId = commentId;
    comment.rating = rating;
    comment.image = image;
    await comment.save();

    res.status(200).json({comment});
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment.' });
  }
}

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);
    await comment.destroy();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment.' });
  }
}


module.exports = {
  getComment,
  createComment,
  updateComment,
  deleteComment,
};