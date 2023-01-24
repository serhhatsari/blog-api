const userRoutes = require('express').Router();
const userController = require('../controller/userController');
const { register } = require('../controller/authController');
const validateRequest = require('../middleware/validateRequest');

userRoutes.post('/users', validateRequest.validateRegister, register);
userRoutes.get('/users', userController.getAllUsers);
userRoutes.get('/users/:id', validateRequest.checkUserID, userController.getUserById);
userRoutes.get('/me', userController.getMe);
userRoutes.get('/users/:id/posts', validateRequest.checkUserID, userController.getUserPosts);
userRoutes.get('/users/:id/comments', validateRequest.checkUserID, userController.getUserComments);
userRoutes.put('/users', validateRequest.updateUser, userController.updateUser);
userRoutes.delete('/users', userController.deleteUser);

module.exports = userRoutes;