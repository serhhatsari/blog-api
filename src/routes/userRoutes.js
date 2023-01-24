const userRoutes = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/userController');


userRoutes.get('/users', verifyToken, userController.getAllUsers());
userRoutes.get('/users/:id', verifyToken, getUserById);
userRoutes.get('/me', verifyToken, getMe);
userRoutes.get('/users/:id/posts', verifyToken, getUserPosts);
userRoutes.get('/users/:id/comments', verifyToken, getUserComments);

module.exports = userRoutes;