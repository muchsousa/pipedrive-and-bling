const database = require('./database');
const server = require('./server');
const logger = require('./logger');

const pipedriveService = require('./services/pipedriveService');

(async () => {
	try {
		// configure automaticaly webhook
		await pipedriveService.configureDealWebhook();

		server.configure();
		database.configureEvents();

		await database.connect();
		await server.start();
	
		const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
		for (const exitSignal of exitSignals) {
			process.on(exitSignal, async () => {
				try {
					await database.disconnect();

					logger.info('Aplication exited with success');
					process.exit(0);
				} catch (error) {
					logger.info('Aplication exited with error');
					logger.error(error);
					process.exit(1);
				}
			});
		}
	} catch(error) {
		logger.info('Aplication exited with error');
		logger.error(error);
		process.exit(1);
	}
})();

