const userRoutes = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/userController');
const { register } = require('../controllers/authController');

userRoutes.post('/users', verifyToken, register);
userRoutes.get('/users', verifyToken, userController.getAllUsers());
userRoutes.get('/users/:id', verifyToken, userController.getUserById);
userRoutes.get('/me', verifyToken, userController.getMe);
userRoutes.get('/users/:id/posts', verifyToken, userController.getUserPosts);
userRoutes.get('/users/:id/comments', verifyToken, userController.getUserComments);
userRoutes.put('/users/:id', verifyToken, userController.updateUser);
userRoutes.delete('/users/:id', verifyToken, userController.deleteUser);

module.exports = userRoutes;