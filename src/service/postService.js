const postModel = require("../model/postModel");
const commentModel = require("../model/commentModel");
const personModel = require("../model/personModel");
const { getUserID } = require("../utils");
const e = require("express");

function getAllPosts(req, res) {
    return postModel
        .findAll(
            {
                attributes: {
                    exclude: ["user_id"],
                },

                include: [
                    {
                        model: personModel,
                        attributes: ["person_id", "person_name", "person_surname"],
                    },
                ],
            }
        );
}

function getPost(req, res) {

    return postModel
        .findOne({
            attributes: {
                exclude: ["user_id"],
            },
            include: [
                {
                    model: personModel,
                    as: "author",
                    attributes: ["person_id", "person_name", "person_surname"],
                },
                {
                    model: commentModel,
                    attributes: ["content"],
                    include: [
                        {
                            model: personModel,
                            attributes: ["person_id", "person_name", "person_surname"],
                        },
                    ],
                },
            ],
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
            attributes: ["comment_id", "content"],
            include: [
                {
                    model: personModel,
                    attributes: ["person_id", "person_name", "person_surname"],
                },
            ],
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
                comments: post,
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
