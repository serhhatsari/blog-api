const userService = require('../service/userService');

function getAllUsers(req, res) {
    userService.getAllUsers(req, res);
}

function getUserById(req, res) {
    userService.getUserById(req, res);
}

function getMe(req, res) {
    userService.getMe(req, res);
}

function getUserPosts(req, res) {
    userService.getUserPosts(req, res);
}

function getUserComments(req, res) {
    userService.getUserComments(req, res);
}

function updateUser(req, res) {
    userService.updateUser(req, res);
}

function deleteUser(req, res) {
    userService.deleteUser(req, res);
}


module.exports = {
    getAllUsers,
    getUserById,
    getMe,
    getUserPosts,
    getUserComments,
    updateUser,
    deleteUser,

}


