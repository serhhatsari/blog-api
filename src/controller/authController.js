const auth_service = require('../service/authService');

function register(req, res) {
    auth_service.register(req, res);
}

function login(req, res) {
    auth_service.login(req, res);
}

module.exports = {
    register,
    login,
};