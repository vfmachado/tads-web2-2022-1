
const { Router } = require('express');
const { save, findAll } = require('../data/memory-db');

const UsersController = require('../controllers/users-controller');
const { LoginController } = require('../controllers/login-controller');
const { isAuth } = require('../middlewares/is-auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// /users
const routes = Router();

const usersController = new UsersController();
const loginController = new LoginController();



// AUTORIZAÇÃO - QUEM PODE ACESSAR O QUE
const isAdmin = (req, res, next) => {
    if (req.session?.user.type == 'ADMIN') return next();
    return res.redirect('/login.html');
}

routes.post('/', upload.single('picture'), usersController.create);

routes.get('/', isAuth, isAdmin,/* isAdmin, */ usersController.list);

routes.get('/logout', loginController.logout);

routes.get('/:id', isAuth, usersController.detail);

routes.post('/login', loginController.login);

module.exports = routes;    
