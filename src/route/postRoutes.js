const post_routes = require('express').Router();
const postController = require('../controller/postController');
const validateRequest = require('../middleware/validateRequest');

/**
 * @swagger
 *
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: An array of posts
 */
post_routes.get('/posts', postController.getPosts)

/**
 * @swagger
 *
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid request
 */
post_routes.post('/posts', validateRequest.createPost, postController.createPost)

/**
 * @swagger
 *
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A post object
 *       404:
 *         description: Post not found
 */
post_routes.get('/posts/:id', validateRequest.getPost, postController.getPost)

/**
 * @swagger
 *
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Post not found
 */
post_routes.put('/posts/:id', validateRequest.updatePost, postController.updatePost)

/**
 * @swagger
 *
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
post_routes.delete('/posts/:id', postController.deletePost)

post_routes.get('/posts/:id/comments', postController.getPostComments)

module.exports = post_routes;