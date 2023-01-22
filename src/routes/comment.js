const comment_routes = require('express').Router();

// comment routes
comment_routes.get('/comments', commentController.getComments)
comment_routes.post('/comments', commentController.createComment)
comment_routes.get('/comments/:id', commentController.getComment)
comment_routes.put('/comments/:id', commentController.updateComment)
comment_routes.delete('/comments/:id', commentController.deleteComment)


module.exports = comment_routes;