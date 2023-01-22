const comment_service = require("../service/commentService");

function getComments(req, res) {
    comment_service.getAllComments(req, res);
}

function createComment(req, res) {
    comment_service.createComment(req, res);
}

function getComment(req, res) {
    comment_service.getComment(req, res);
}

function updateComment(req, res) {
    comment_service.updateComment(req, res);
}

function deleteComment(req, res) {
    comment_service.deleteComment(req, res);
}


module.exports = {
    getComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
};
