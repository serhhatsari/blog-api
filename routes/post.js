const post_routes = require('express').Router();
const postController = require('../controllers/postController');
const { validateRequest } = require('../middlewares/validateRequest');

// post routes
post_routes.get('/posts', validateRequest, postController.getPosts)
post_routes.post('/posts', validateRequest, postController.createPost)
post_routes.get('/posts/:id', validateRequest, postController.getPost)
post_routes.put('/posts/:id', validateRequest, postController.updatePost)
post_routes.delete('/posts/:id', validateRequest, postController.deletePost)


module.exports = post_routes;