const User = require("../sequelize/models/user");


const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) return res.status(400).send("Bad request")
  if (typeof password !== "string" || typeof email !== "string") return res.status(400).send("Bad request")

  try {
    // check if email exists
    const user = await User.findOne({
      where: {
        email: email ? email : { [Op.not]: null },
        password: password,
        verified: 1,
      },
      attributes: ['username', 'email', 'icon', 'role'],
    });
    if (!user) return res.status(401).send("Unauthorized")

    // check if password is correct
    // if (user.password !== password) return res.status(401).send("Unauthorized")
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login.' });
  }

}

const userRegister = async (req, res) => {
  try {
    // check if the body format is correct
    if (!req.body.email || !req.body.password || !req.body.username) return res.status(400).send("Bad request")

    const user = await User.create(req.body);
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register.' });
  }
}


// itemController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['username', 'email', 'icon', 'role'],
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
}


const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: ['username', 'email', 'icon', 'role'],
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
} 

module.exports = {
  getAllUsers,
  getUser,
  userLogin,
  userRegister,
};