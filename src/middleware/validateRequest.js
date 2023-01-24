// Description: This file contains all the validation functions for the requests.

// Authentication validations
function validateRegister(req, res, next) {
    const { name, surname, mail, password } = req.body;
    if (!name || !surname || !mail || !password) {
        return res.status(400).json({ message: 'Name, Surname, Mail, and Password are required.' });
    }
    next();
};

function validateLogin(req, res, next) {
    if (!req.body.mail || !req.body.password) {
        return res.status(400).send({
            message: "Mail and Password are required.",
        });
    }
    next();
}

// Post validations
function createPost(req, res, next) {
    if (!req.body.title || !req.body.content) {
        return res.status(400).send({
            error: "You should provide a title and content and you provided: " + "title: " + req.body.title + " , body: " + req.body.content,
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
    if (!req.body.title || !req.body.content) {
        return res.status(400).send({
            message: "Title or content can not be empty!",
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

// Comment validations

function createComment(req, res, next) {
    if (!req.body.content || !req.body.post_id) {
        return res.status(400).send({
            message: "content or post_id can not be empty!",
        });
    }
    next();
}

function getComment(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Comment id is required",
        });
    }
    next();
}

function updateComment(req, res, next) {
    if (!req.body.content || !req.body.post_id || !req.params.id) {

        return res.status(400).send({
            message: "Content and id can not be empty!",
        });
    }
    next();
}

function deleteComment(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Comment id is required",
        });
    }
    next();
}

// User validations

function updateUser(req, res, next) {
    if (!req.body.name || !req.body.surname) {
        return res.status(400).send({
            message: "Name and Surname are required.",
        });
    }
    next();
}

function checkUserID(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            message: "User id is required",
        });
    }
    next();
}


module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    validateRegister,
    validateLogin,
    createComment,
    getComment,
    updateComment,
    deleteComment,
    checkUserID,
    updateUser,

};