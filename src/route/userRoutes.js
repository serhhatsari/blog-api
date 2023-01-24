const userRoutes = require('express').Router();
const userController = require('../controller/userController');
const { register } = require('../controller/authController');

userRoutes.post('/users', register);
userRoutes.get('/users', userController.getAllUsers);
userRoutes.get('/users/:id', userController.getUserById);
userRoutes.get('/me', userController.getMe);
userRoutes.get('/users/:id/posts', userController.getUserPosts);
userRoutes.get('/users/:id/comments', userController.getUserComments);
userRoutes.put('/users/:id', userController.updateUser);
userRoutes.delete('/users/:id', userController.deleteUser);

module.exports = userRoutes;