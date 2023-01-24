const post_service = require("../service/postService");

function getPosts(req, res) {
    post_service.getAllPosts(req, res);
}

function createPost(req, res) {
    post_service.createPost(req, res);
}

function getPost(req, res) {
    post_service.getPost(req, res);
}

function updatePost(req, res) {
    post_service.updatePost(req, res);
}

function deletePost(req, res) {
    post_service.deletePost(req, res);
}

function getPostComments(req, res) {
    post_service.getPostComments(req, res);
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
    getPostComments,
};
