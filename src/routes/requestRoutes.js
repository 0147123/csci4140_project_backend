const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Define routes
router.get('/all/:itemId', requestController.getRequests);
router.get('/:id', requestController.getRequest);
router.post('/', requestController.createRequest );
router.put('/:id', requestController.updateRequestStatus);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;