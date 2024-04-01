
// itemController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
}

module.exports = {
  getAllUsers
};