const comment_routes = require('express').Router();
const validateRequest = require('../middlewares/validateRequest');
const commentController = require('../controllers/commentController');

/**
 * @swagger
 *
 * /comments:
 *   get:
 *     summary: Retrieve all comments
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
 *         description: An array of comments
 */
comment_routes.get('/comments', commentController.getComments)

/**
 * @swagger
 *
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid request
 */
comment_routes.post('/comments', validateRequest.createComment, commentController.createComment)

/**
 * @swagger
 *
 * /comments/{id}:
 *   get:
 *     summary: Retrieve a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A comment object
 *       404:
 *         description: Comment not found
 */
comment_routes.get('/comments/:id', validateRequest.getComment, commentController.getComment)

/**
 * @swagger
 *
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
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
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Comment not found
 */
comment_routes.put('/comments/:id', validateRequest.updateComment, commentController.updateComment)

/**
 * @swagger
 *
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
comment_routes.delete('/comments/:id', validateRequest.deleteComment, commentController.deleteComment)

module.exports = comment_routes;
