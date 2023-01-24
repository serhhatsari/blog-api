const routes = require('express').Router();
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const { verifyToken } = require('../middleware/verifyToken');

routes.use('/', authRoutes);
routes.use('/', verifyToken, postRoutes);
routes.use('/', verifyToken, commentRoutes);
routes.use('/', verifyToken, userRoutes);

module.exports = routes;