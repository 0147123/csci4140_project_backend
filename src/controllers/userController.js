const User = require("../sequelize/models/User");


const userLogin = async (req, res) => {
  const { email, password, fcmToken } = req.body;

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
      attributes: ['uid', 'username', 'email', 'icon', 'role'],
    });


    // if user does not exist or password is incorrect
    if (!user) return res.status(401).send("Unauthorized")

    // add the fcmToken to the user
    await User.update({ fcmToken: fcmToken }, {
      where: {
        email: email,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login.' });
  }

}

const userRegister = async (req, res) => {
  try {
    console.log(req.body)
    // check if the body format is correct
    if (!req.body.email || !req.body.password || !req.body.username) return res.status(400).send("Bad request")

    // check if email is already registered
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExist) return res.status(409).send("Email already registered")


    await User.create(req.body);

    // get created user
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: ['username', 'email', 'icon', 'role'],
    });
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register.' });
  }
}


// itemController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['uid', 'username', 'email', 'icon', 'role'],
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
      attributes: ['uid', 'username', 'email', 'icon', 'role'],
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
} 

const userLogout = async (req, res) => {
  const { email } = req.body;

  try {
    // check if email exists
    await User.update({ fcmToken: null }, {
      where: {
        email: email,
      },
    });

    res.status(200).send("Logged out successfully")
  }

  catch (error) {
    res.status(500).json({ message: 'Failed to logout.' });
  }

}

const userUpdate = async (req, res) => {
  const { email, username, uid } = req.body;

  try {
    // check if email exists
    await User.update({ username, email }, {
      where: {
        uid: uid,
      },
    });

    const user = await User.findOne({
      where: {
        uid: uid,
      },
      attributes: ['uid', 'username', 'email', 'icon', 'role', 'fcmToken'],
    });

    console.log(user)

    res.status(200).json({ user });
  }

  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update.' });
  }

}

module.exports = {
  getAllUsers,
  getUser,
  userLogin,
  userRegister,
  userLogout,
  userUpdate,
};