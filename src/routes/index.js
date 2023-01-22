const routes = require('express').Router();
const auth = require('./auth');
const post = require('./post');
const comment = require('./comment');
const { verifyToken } = require('../middlewares/verifyToken');

routes.use('/', auth);
routes.use('/', verifyToken, post);
routes.use('/', verifyToken, comment)

module.exports = routes;