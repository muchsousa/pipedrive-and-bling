const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');
const logger = require('./logger');
const apiRouter = require('./router');

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const httpErrorMiddleware = require('./middlewares/httpErrorMiddleware');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');

const server = express();

module.exports.configure = () =>
	server
		.use(cors())
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: false }))
		.use(loggerMiddleware)
		.use(apiRouter)
		.use(httpErrorMiddleware)
		.use(notFoundMiddleware);

module.exports.start = async () => 
	http.createServer(server)
		.listen(config.server.port, () => {
			logger.info(`Listening at port: ${config.server.port}`);
		});
