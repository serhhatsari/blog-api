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
    userService.getUserPosts(req.params.id);
}

const getUserComments = async (req, res) => {
    userService.getUserComments(req.params.id);
}

const updateUser = async (req, res) => {
    userService.updateUser(req.params.id, req.body);
}

const deleteUser = async (req, res) => {
    userService.deleteUser(req.params.id);
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


