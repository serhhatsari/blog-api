const post_routes = require('express').Router();
const postController = require('../controllers/postController');
const validateRequest = require('../middlewares/validateRequest');

// post routes
post_routes.get('/posts', validateRequest.getPosts, postController.getPosts)
post_routes.post('/posts', validateRequest.createPost, postController.createPost)
post_routes.get('/posts/:id', validateRequest.getPost, postController.getPost)
post_routes.put('/posts/:id', validateRequest.updatePost, postController.updatePost)
post_routes.delete('/posts/:id', validateRequest.updatePost, postController.deletePost)


module.exports = post_routes;