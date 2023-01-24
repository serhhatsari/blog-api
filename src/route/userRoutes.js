const userRoutes = require('express').Router();
const userController = require('../controller/userController');
const { register } = require('../controller/authController');
const validateRequest = require('../middleware/validateRequest');

/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered a new user
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: An array of all users
 */
userRoutes.post('/users', validateRequest.validateRegister, register);

/**
 * @swagger
 *
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: An array of all users
 */
userRoutes.get('/users', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object
 */
userRoutes.get('/users/:id', validateRequest.checkUserID, userController.getUserById);

/**
*  @swagger
 * /me:
 *   get:
 *     summary: Retrieve the current user's information
 *     responses:
 *       200:
 *         description: The current user's information
 * */
userRoutes.get('/me', userController.getMe);

/**
*  @swagger
 * /users/{id}/posts:
 *   get:
 *     summary: Retrieve all posts by a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An array of posts by the user
 * */
userRoutes.get('/users/:id/posts', validateRequest.checkUserID, userController.getUserPosts);

/**
*  @swagger
 * /users/{id}/comments:
 *   get:
 *     summary: Retrieve all comments by a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An array of comments by the user
 *
 * */
userRoutes.get('/users/:id/comments', validateRequest.checkUserID, userController.getUserComments);

/**
*  @swagger
 * /users:
 *   put:
 *     summary: Update a user's information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user's information
 * */
userRoutes.put('/users', validateRequest.updateUser, userController.updateUser);

/**
*  @swagger
 * /users:  
 * delete:
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: Successfully deleted the user
 * */
userRoutes.delete('/users', userController.deleteUser);

module.exports = userRoutes;