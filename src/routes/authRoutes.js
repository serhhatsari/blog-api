const auth_routes = require('express').Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');

/**
 * @swagger
 *
 * /auth/register:
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
 *                type: string
 *                example: Serhat
 *               surname:
 *                type: string
 *                example: SARI
 *               mail:
 *                 type: string
 *                 example: serhat@gmail.com
 *               password:
 *                 type: string
 *                 example: serhat123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */
auth_routes.post('/auth/register', validateRequest.validateRegister, authController.register)

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 example: serhat@gmail.com
 *               password:
 *                 type: string
 *                 example: serhat123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request
 */
auth_routes.post('/auth/login', validateRequest.validateLogin, authController.login)


module.exports = auth_routes;