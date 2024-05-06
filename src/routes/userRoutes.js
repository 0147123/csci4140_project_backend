const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);
router.post('/logout', userController.userLogout);


module.exports = router;