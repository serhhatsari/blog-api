const auth_routes = require('express').Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');

// auth routes
auth_routes.post('/auth/register', validateRequest.validateRegister, authController.register)
auth_routes.post('/auth/login', validateRequest.validateLogin, authController.login)


module.exports = auth_routes;