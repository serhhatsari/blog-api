const personModel = require('../model/personModel');
const postModel = require('../model/postModel');
const commentModel = require('../model/commentModel');
const { getUserID } = require('../utils');

function getAllUsers(req, res) {
    personModel.findAll().then((data) => {
        return res.status(200).send({
            users: data.map((user) => {
                return {
                    id: user.person_id,
                    name: user.person_name,
                    surname: user.person_surname,
                };
            }),
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });

}

const getUserById = async (req, res) => {
    personModel.findOne({
        where: {
            person_id: req.params.id,
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            });
        }
        return res.status(200).send({
            name: data.person_name,
            surname: data.person_surname,
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
            id: data.person_id,
            name: data.person_name,
            surname: data.person_surname,
            mail: data.person_mail,
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
        where: {
            user_id: req.params.id,
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            })
        }
        return res.status(200).send({
            posts: data.map((post) => {
                return {
                    id: post.post_id,
                    title: post.title,
                    content: post.content,
                }
            })
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        })
    });
}

const getUserComments = async (req, res) => {
    commentModel.findAll({
        where: {
            user_id: req.params.id,
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            })
        }
        return res.status(200).send({
            comments: data.map((comment) => {
                return {
                    id: comment.comment_id,
                    content: comment.content,
                }
            }
            )
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
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
                message: "Post not found with id " + req.params.id,
            });
        }
        return res.status(200).send({
            message: "Post was updated successfully.",
        }
        );
    })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts.",
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
                message: "Post not found with id " + req.params.id,
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
