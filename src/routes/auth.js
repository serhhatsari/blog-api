const auth_routes = require('express').Router();
const authController = require('../controllers/authController');
const validateRegister = require('../middlewares/validateRegister');

// auth routes
auth_routes.post('/auth/register', validateRegister, authController.register)
auth_routes.post('/auth/login', authController.login)


module.exports = auth_routes;