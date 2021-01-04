const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('./config');

module.exports.configureEvents = () => {
	const connection = mongoose.connection;
	
	connection.on('connecting', () => logger.info('connecting in mongodb'));
	connection.on('connected', () => logger.info('connected on mongodb'));
	connection.on('disconnecting', () => logger.warn('disconnecting mongodb'));
	connection.on('disconnected', () => logger.error('disconnected on mongodb'));
	connection.on('close', () => logger.error('mongodb connection has been closed'));
	connection.on('reconnected', () => logger.info('mongodb connection has been closed'));
};

module.exports.connect = async () => {
	await mongoose.connect(
		config.mongo.urlConnection,
		{ 
			retryWrites: true,
			useUnifiedTopology: true,
			useNewUrlParser: true
		}
	);
};

module.exports.disconnect = () => mongoose.connection.close();
