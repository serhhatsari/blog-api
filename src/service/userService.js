const personModel = require('../model/personModel');
const postModel = require('../model/postModel');
const commentModel = require('../model/commentModel');
const { getUserID } = require('../utils');

function getAllUsers(req, res) {
    personModel.findAll().then((data) => {
        return res.status(200).send(data);
    }).catch((err) => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });

}

const getUserById = async (req, res) => {
    personModel.findOne({
        where: {
            id: req.params.id,
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            });
        }
        return res.status(200).send(data);
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
            id: getUserID(req, res),
        },
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.id,
            });
        }
        return res.status(200).send(data);
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
            person_mail: req.body.mail,
            person_password: req.body.password,
        },
        {
            where: {
                id: req.params.id,
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
            id: req.params.id,
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
