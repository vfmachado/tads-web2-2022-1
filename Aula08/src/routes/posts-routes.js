
const { Router } = require('express');

const { PostsController } = require('../controller/posts-controller');
const postsController = new PostsController();
const routes = Router();

routes.get('/',  postsController.list);

routes.get('/:id', postsController.detail);

// MEU-MIDDLEWARE-VALIDACAO
// routes.use((req, res, next) => req.session.user ? next() : res.status(403).send('forbidden'))

// routes.post('/', postsController.create);

// routes.post('/:id', postsController.update);

// routes.get('/delete/:id', postsController.delete);


module.exports = routes;    
