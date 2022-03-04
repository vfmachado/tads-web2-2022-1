
const { Router } = require('express');
const { save, findAll } = require('../data/db');

const UsersController = require('../controllers/users-controller');

// /users
const routes = Router();

const usersController = new UsersController();

routes.post('/', usersController.create);

routes.get('/', usersController.list);

module.exports = routes;
