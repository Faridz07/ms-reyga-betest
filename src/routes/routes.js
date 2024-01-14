const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/generate-token', authController.generateToken);

router.post('/users', authenticateToken, userController.createUser);
router.get('/users/account/:accountNumber', authenticateToken, userController.getUserByAccountNumber);
router.get('/users/identity/:identityNumber', authenticateToken, userController.getUserByIdentityNumber);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;
