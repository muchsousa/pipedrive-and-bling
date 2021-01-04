const logger = require('../logger');

module.exports = (error, _req, res, next) => {
	if (!error)
		next();

	const { status, message, details } = error;
	logger.error(error);

	const httpStatus = status || 500;
	return res.status(httpStatus)
		.json({
			status: httpStatus,
			message,
			details
		});
};
