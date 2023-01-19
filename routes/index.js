const routes = require('express').Router();
const auth = require('./auth');
const post = require('./post');

routes.use('/', auth);
routes.use('/', post);

module.exports = routes;