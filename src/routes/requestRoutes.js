const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Define routes
router.get('/:itemId', requestController.getRequests);
router.post('/', requestController.createRequest );
router.delete('/:id', requestController.deleteRequest);

module.exports = router;