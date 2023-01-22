const routes = require('express').Router();
const auth = require('./authRoutes');
const post = require('./postRoutes');
const comment = require('./commentRoutes');
const { verifyToken } = require('../middlewares/verifyToken');

routes.use('/', auth);
routes.use('/', verifyToken, post);
routes.use('/', verifyToken, comment)

module.exports = routes;