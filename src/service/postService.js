const post_model = require("../models/post");

function getAllPosts(req, res) {

    post_model
        .findAll({
            where: {
                user_id: req.body.user_id,
            },
        }).then((posts) => {
            return res.send(posts);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });

}

function getPost(req, res) {

    post_model
        .findOne({
            where: {
                post_id: req.params.id,
            },
        })
        .then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id,
                });
            }
            return res.send(post);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });
}

function createPost(req, res) {
    const post = post_model
        .create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
        })
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the post.",
            });
        });
}

function updatePost(req, res) {
    post_model
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
        )
        .then((post) => {
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
    post_model
        .destroy({
            where: {
                post_id: req.params.id
            }
        })
        .then((post) => {
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



module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,

};
