const comment_routes = require('express').Router();
const validateRequest = require('../middlewares/validateRequest');
const commentController = require('../controllers/commentController');

// comment routes
comment_routes.get('/comments', validateRequest.getComments, commentController.getComments)
comment_routes.post('/comments', validateRequest.createComment, commentController.createComment)
comment_routes.get('/comments/:id', validateRequest.getComment, commentController.getComment)
comment_routes.put('/comments/:id', validateRequest.updateComment, commentController.updateComment)
comment_routes.delete('/comments/:id', validateRequest.deleteComment, commentController.deleteComment)


module.exports = comment_routes;