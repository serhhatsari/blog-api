const postModel = require("../model/postModel");
const commentModel = require("../model/commentModel");
const personModel = require("../model/personModel");
const { getUserID } = require("../utils");

function getAllPosts(req, res) {
    postModel
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
            }
        ).then((posts) => {
            return res.status(200).send({ posts });
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });
}

function getPost(req, res) {
    postModel
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

        }).then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id,
                });
            }
            return res.status(200).send(post);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });
}

function createPost(req, res) {
    postModel
        .create({
            title: req.body.title,
            content: req.body.content,
            user_id: getUserID(req, res)
        }).then((data) => {
            return res.status(201).send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the post.",
            });
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
    postModel
        .destroy({
            where: {
                post_id: req.params.id,
                user_id: getUserID(req, res)
            }
        }).then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id.toString()
                });
            }
            return res.status(200).send({
                message: "Post deleted successfully!"
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts."
            });
        });
}

function getPostComments(req, res) {
    commentModel
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
