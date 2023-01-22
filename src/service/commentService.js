const commentModel = require('../models/comment');

function getComments() {
    commentModel.findAll(
        {
            where: {
                user_id: req.body.user_id,
            },
        },
    ).then((comments) => {
        return res.send(comments);
    }
    ).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving comments.',
        });
    });

}

function createComment() {
    commentModel.create(
        {
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        },
    ).then((data) => {
        return res.send(data);
    }
    ).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while creating the comment.',
        });
    }
    );
}

function getComment() {
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

function updateComment() {
    commentModel.update(
        {
            content: req.body.content,
            user_id: req.body.user_id,
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
        return res.send(data);
    }).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while updating the comment.',
        });
    });
}

function deleteComment() {
    commentModel.destroy(
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
        return res.send(data);
    }).catch((err) => {
        return res.status(500).send({
            message:
                err.message || 'Some error occurred while deleting the comment.',
        });
    });
}



module.exports = {
    getComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
};
