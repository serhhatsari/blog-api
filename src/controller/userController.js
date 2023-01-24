const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    userService.getAllUsers();
}

const getUserById = async (req, res) => {
    userService.getUserById(req, res);
}

const getMe = async (req, res) => {
    userService.getUserById(req, res);
}

const getUserPosts = async (req, res) => {
    userService.getUserPosts(req, res);
}

const getUserComments = async (req, res) => {
    userService.getUserComments(req, res);
}

const updateUser = async (req, res) => {
    userService.updateUser(req, res);
}

const deleteUser = async (req, res) => {
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


