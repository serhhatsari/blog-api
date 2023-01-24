const postModel = require("../model/postModel");
const commentModel = require("../model/commentModel");
const { getUserID } = require("../utils");

function getAllPosts(req, res) {
    return postModel
        .findAll();
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
            user_id: getUserID(req, res)
        });
}

function updatePost(req, res) {
    postModel
        .update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: getUserID(req, res),
            },
            {
                where: {
                    post_id: req.params.id,
                    user_id: getUserID(req, res)
                },
            }
        ).then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id,
                });
            }
            return res.status(200).send(
                req.body
            );
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });

}

function deletePost(req, res) {
    return postModel
        .destroy({
            where: {
                post_id: req.params.id,
                user_id: getUserID(req, res)
            }
        });
}

function getPostComments(req, res) {
    return commentModel
        .findAll({
            where: {
                post_id: req.params.id,
            },
        }).then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id,
                });
            }
            return res.status(200).send({
                comments: post.map((comment) => {
                    return {
                        id: comment.comment_id,
                        content: comment.content,
                    };
                })
            });
        }).catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostComments,
};
