const postModel = require("../models/postModel");

function getAllPosts(req, res) {
    return postModel
        .findAll({
            where: {
                user_id: req.body.user_id,
            },
        });
}

function getPost(req, res) {

    return postModel
        .findOne({
            where: {
                post_id: req.params.id,
            },
        });
}

function createPost(req, res) {
    return postModel
        .create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
        });
}

function updatePost(req, res) {
    return postModel
        .update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.body.user_id,
            },
            {
                where: {
                    post_id: req.params.id,
                },
            }
        );

}

function deletePost(req, res) {
    postModel
        .destroy({
            where: {
                post_id: req.params.id,
            }
        });
}



module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,

};
