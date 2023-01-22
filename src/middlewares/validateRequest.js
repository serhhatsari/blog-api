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
    validateRegister,
    validateLogin
};