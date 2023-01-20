const routes = require('express').Router();
const auth = require('./auth');
const post = require('./post');
const { validateRequest } = require('../middlewares/verifyToken');

routes.use('/', auth);
routes.use('/', validateRequest, post);

module.exports = routes;