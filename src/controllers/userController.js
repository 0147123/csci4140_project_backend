const User = require("../sequelize/models/user");

// itemController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
}

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
}

module.exports = {
  getAllUsers,
  getUser
};