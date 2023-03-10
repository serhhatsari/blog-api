const personModel = require('../model/personModel');
const postModel = require('../model/postModel');
const commentModel = require('../model/commentModel');
const { getUserID } = require('../utils');

function getAllUsers(req, res) {
    personModel.findAll(
        {
            attributes: {
                exclude: ['person_mail', 'person_password'],
            },
            include: [
                {
                    model: postModel,
                    attributes: ['post_id', 'title', 'content'],
                },
                {
                    model: commentModel,
                    attributes: ['comment_id', 'content'],
                },
            ],
        }
    ).then((users) => {
        return res.status(200).send({ users });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });

}

const getUserById = async (req, res) => {
    personModel.findOne({
        attributes: {
            exclude: ['person_mail', 'person_password'],
        },
        include: [
            {
                model: postModel,
                attributes: ['post_id', 'title', 'content'],
            },
            {
                model: commentModel,
                attributes: ['comment_id', 'content'],
            },
        ],

        where: {
            person_id: req.params.id,
        },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id,
            });
        }
        return res.status(200).send({
            user
        });
    }
    ).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    }
    );
}

const getMe = async (req, res) => {
    personModel.findOne({
        attributes: {
            exclude: ['person_mail', 'person_password'],
        },
        include: [
            {
                model: postModel,
                attributes: ['post_id', 'title', 'content'],
            },
            {
                model: commentModel,
                attributes: ['comment_id', 'content'],
            },
        ],
        where: {
            person_id: getUserID(req, res),
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            });
        }
        return res.status(200).send({
            data
        });
    }
    ).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    }
    );
}

const getUserPosts = async (req, res) => {
    postModel.findAll({
        attributes: {
            exclude: ['user_id'],
        },
        include: [
            {
                model: commentModel,
                attributes: ['comment_id', 'content'],
            },
        ],
        where: {
            user_id: req.params.id,
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            })
        }
        return res.status(200).send({ posts: data });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        })
    });
}

const getUserComments = async (req, res) => {
    commentModel.findAll({
        attributes: {
            exclude: ['user_id'],
        },
        include: [
            {
                model: postModel,
                attributes: ['post_id', 'title', 'content'],
            },
        ],
        where: {
            user_id: req.params.id,
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.id,
            })
        }
        return res.status(200).send({ data });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving Comments."
        })
    });
}

const updateUser = async (req, res) => {
    personModel.update(
        {
            person_name: req.body.name,
            person_surname: req.body.surname,
        },
        {
            where: {
                person_id: getUserID(req, res)
            },
        }
    ).then((person) => {
        if (!person) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id,
            });
        }
        return res.status(200).send({
            message: "User was updated successfully.",
        }
        );
    })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users.",
            });
        });
}

const deleteUser = async (req, res) => {
    personModel.destroy({

        where: {
            person_id: getUserID(req, res),
        },
    }).then((person) => {
        if (!person) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id,
            });
        }
        return res.status(200).send({
            message: "User was deleted successfully."
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });
}


module.exports = {
    getAllUsers,
    getUserById,
    getMe,
    getUserPosts,
    getUserComments,
    updateUser,
    deleteUser

};
