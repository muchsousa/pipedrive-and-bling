const asyncMiddleware = require('../middlewares/asyncMiddleware');
const OrderModel = require('../models/orderModel');

const joi = require('joi');
const paginationSchema = joi.object({
	page: joi.number()
		.positive()
		.min(1)
		.default(1),
	perPage: joi.number()
		.positive()
		.min(1)
		.max(100)
		.default(10)
});


module.exports = {

	getAll: asyncMiddleware(async ctx => {

		const { value, error } = paginationSchema.validate(ctx.query, { convert: true, abortEarly: false });

		if (error) 
			throw Object.assign(
				new Error('Bad Request'),
				{ status: 400, details: error.details.map(e => e.message) }
			);

		const { page, perPage } = value;

		const total = await OrderModel.countDocuments({});
		const orders = await OrderModel.find({})
			.sort({ _id: 1 })
			.skip(page - 1)
			.limit(perPage);

		return ctx.res.json({
			page,
			perPage,
			total,
			orders
		}).status(200);
	})

};
