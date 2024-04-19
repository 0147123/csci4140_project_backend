const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Define routes
router.get('/conversation/:uid', messageController.getConversations);
router.get('/conversation', messageController.checkOrCreateConversation);
router.get('/:id', messageController.getMessages);
router.post('/:conversationId', messageController.createMessage);

module.exports = router;