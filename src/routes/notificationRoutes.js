const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Define routes
router.get('/:uid', notificationController.getNotifications);
router.put('/:id', notificationController.updateNotification);

module.exports = router;