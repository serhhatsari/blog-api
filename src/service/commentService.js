const commentModel = require('../model/commentModel');
const personModel = require('../model/personModel');
const postModel = require('../model/postModel');
const { getUserID } = require("../utils");

function getAllComments(req, res) {
    commentModel.findAll(
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
    )
        .then((comments) => {
            return res.status(200).send({
                comments,
            }
            );
        }
        ).catch((err) => {
            return res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving comments.',
            });
        });

}

function createComment(req, res) {
    commentModel.create(
        {
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: getUserID(req, res),
        },
    ).then((data) => {
        return res.status(201).send({
            message: "Comment created successfully",
            data: {
                comment_id: data.comment_id,
                content: data.content,
                post_id: data.post_id,
            },
        });
    }
    ).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while creating the comment.',
        });
    }
    );
}

function getComment(req, res) {
    commentModel.findOne(
        {
            where: {
                comment_id: req.params.id,
            },
        }
    ).then((comment) => {
        if (!comment) {
            return res.status(404).send({
                message: 'Comment not found with id ' + req.params.id,
            });
        }
        return res.send(comment);
    }).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving comments.',
        });
    });
}

function updateComment(req, res) {
    commentModel.update(
        {
            content: req.body.content,
            user_id: getUserID(req, res),
            post_id: req.body.post_id,
        },
        {
            where: {
                comment_id: req.params.id,
            },
        }
    ).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: 'Comment not found with id ' + req.params.id,
            });
        }
        return res.status(200).send({
            message: "Comment updated successfully",
        });
    }).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while updating the comment.',
        });
    });
}

function deleteComment(req, res) {
    commentModel.destroy(
        {
            where: {
                comment_id: req.params.id,
                user_id: getUserID(req, res),
            },
        }
    ).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: 'Comment not found with id ' + req.params.id,
            });
        }
        return res.status(200).send({
            message: "Comment deleted successfully",
        });
    }).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while deleting the comment.',
        });
    });
}

module.exports = {
    getAllComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
};
