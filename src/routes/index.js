const routes = require('express').Router();
const auth = require('./auth');
const post = require('./post');
const verifyToken = require('../middlewares/verifyToken');

routes.use('/', auth);
routes.use('/', verifyToken.verifyToken, post);

module.exports = routes;