const post_service = require("../service/postService");

function getPosts(req, res) {
    const allPosts = post_service.getAllPosts(req, res);
    allPosts.then((posts) => {
        return res.send(posts);
    })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });
}

function createPost(req, res) {
    const newPost = post_service.createPost(req, res);
    newPost.then((data) => {
        return res.send(data);
    })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the post.",
            });
        });
}

function getPost(req, res) {
    const post = post_service.getPost(req, res);
    post.then((post) => {
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

function updatePost(req, res) {
    const updatedPost = post_service.updatePost(req, res);
    updatedPost.then((post) => {
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
    const deletedPost = post_service.deletePost(req, res);
    deletedPost
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
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
};
