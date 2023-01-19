function getPosts(req, res, next) {
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "User id is required",
        });
    }
    next();
}

function createPost(req, res, next) {
    if (!req.body.title || !req.body.content || !req.body.user_id) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    next();
}

function getPost(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Post id is required",
        });
    }
    next();
}

function updatePost(req, res, next) {
    if (!req.body.title || !req.body.content || !req.body.user_id) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    next();
}

function deletePost(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Post id is required",
        });
    }
    next();
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
};