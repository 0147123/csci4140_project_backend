const Notification = require('../sequelize/models/Notification');

const getNotifications = async (req, res) => {
  try {
    const { uid } = req.params;
    const notifications = await Notification.findAll({
      where: { uid: uid },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
}

const updateNotification = async (req, res) => {
    
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const notification = await Notification.findByPk(id);
      notification.status = status;
      await notification.save();
  
      res.status(200).json({ notification });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update notification.' });
    }
  }

module.exports = {
  getNotifications,
  updateNotification,
};