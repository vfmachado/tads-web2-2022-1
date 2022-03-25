const { Router } = require('express');

const routes = Router();

const PollController = require('../controllers/poll-controller');
const { isAuth } = require('../middlewares/is-auth');
const pollController = new PollController();

routes.post('/', isAuth, pollController.create);

routes.post('/vote', isAuth, pollController.vote);

routes.get('/:id', pollController.detail);

module.exports = routes;