
const { Router } = require('express');
const { save, findAll } = require('../data/memory-db');

const UsersController = require('../controllers/users-controller');
const { LoginController } = require('../controllers/login-controller');

// /users
const routes = Router();

const usersController = new UsersController();
const loginController = new LoginController();

//AUTENTICAÇÃO - GARANTINDO QUE O USUÁRIO EXISTE NA SESSION
const isAuth = (req, res, next) => {
    if (req.session?.user) return next();
    return res.redirect('/login.html');
}

// AUTORIZAÇÃO - QUEM PODE ACESSAR O QUE
const isAdmin = (req, res, next) => {
    if (req.session?.user.type == 'admin') return next();
    return res.redirect('/login.html');
}

routes.post('/', usersController.create);

routes.get('/', /* isAdmin, */ usersController.list);

routes.get('/logout', loginController.logout);

routes.get('/:id', isAuth, usersController.detail);

routes.post('/login', loginController.login);

module.exports = routes;
