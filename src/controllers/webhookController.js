const asyncMiddleware = require('../middlewares/asyncMiddleware');
const OrderModel = require('../models/orderModel');
const blingService = require('../services/blingService');

const joi = require('joi');

const dealWebhookSchema = joi.object({
	current: joi.object()
		.keys({
			title: joi.string().required(),
			value: joi.number().required(),
			currency: joi.string().required(),
			person_name: joi.string().required(),
			update_time: joi.string(),
			status: joi.string().required(),
		})
});

module.exports = {

	dealWebhook: asyncMiddleware(async ctx => {

		const { value, error } = dealWebhookSchema.validate(ctx.body, { convert: true, abortEarly: false, allowUnknown: true });

		if (error) 
			throw Object.assign(
				new Error('Bad Request'),
				{ status: 400, details: error.details.map(e => e.message) }
			);

		const { title, value: unitValue, currency, status, person_name, update_time } = value.current;
		
		if (status !== 'won')
			return ctx.res.send().status(202);

		const payloadOrder = {
			date: update_time || new Date(),
			customer: {
				name: person_name
			},
			item: {
				code: `${new Date().getTime()}`.slice(-6),
				description: title,
				quantity: 1,
				unit_value: unitValue
			},
			description: 'integrated from pipedrive'
		};

		const amount = payloadOrder.item.quantity * payloadOrder.item.unit_value;

		const { orders } = await blingService.createOrder(payloadOrder);
		const { idPedido: order_id } = orders[0].pedido;

		await OrderModel.create({
			...payloadOrder,
			order_id,
			amount,
			currency
		});

		return ctx.res.send().status(201);
	})

};
