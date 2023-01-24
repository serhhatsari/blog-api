const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
}

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
}

const getMe = async (req, res) => {
    const user = await userService.getUserById(req.userId);
    res.json(user);
}

const getUserPosts = async (req, res) => {
    const posts = await userService.getUserPosts(req.params.id);
    res.json(posts);
}

const getUserComments = async (req, res) => {
    const comments = await userService.getUserComments(req.params.id);
    res.json(comments);
}

module.exports = {
    getAllUsers,
    getUserById,
    getMe,
    getUserPosts,
    getUserComments
}


