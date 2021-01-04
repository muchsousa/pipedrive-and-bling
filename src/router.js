const { Router } = require('express');

const orderController = require('./controllers/orderController');
const webhookController = require('./controllers/webhookController');

const apiRouter = Router();

apiRouter
	.get('/', (_req, res) => res.send({ message: 'api running' }))
	.get('/orders', orderController.getAll)
	.post('/webhook', webhookController.dealWebhook);

module.exports = apiRouter;
