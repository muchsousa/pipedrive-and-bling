const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
	{ name: String },
	{ _id : false, timestamps: false, versionKey: false }
);

const ItemSchema = new mongoose.Schema(
	{
		code: String,
		description: String,
		quantity: Number,
		unit_value: Number
	},
	{ _id : false, timestamps: false, versionKey: false }
);

const OrderSchema = new mongoose.Schema(
	{
		order_id: {
			type: String,
			unique: true,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		},
		customer: CustomerSchema,
		item: ItemSchema,
		amount: {
			type: Number,
			required: true
		},
		currency: String
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Orders', OrderSchema);
