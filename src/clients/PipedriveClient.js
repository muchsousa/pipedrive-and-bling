const axios = require('axios');
const logger = require('../logger');

const { integrations: integrationsConfig } = require('../config');

const client = axios.create({ 
	baseURL: integrationsConfig.pipedrive.url,
	timeout: 15000
});

module.exports.getWebHooks = async () => {
	try {
		const { data } = await client.get(
			`/webhooks?api_token=${integrationsConfig.pipedrive.key}`
		);

		return data;
	} catch(error) {
		logger.error(error);
		throw error;
	}
};

module.exports.createWebHook = async payload => {
	try {
		const { data } = await client.post(
			`/webhooks?api_token=${integrationsConfig.pipedrive.key}`,
			payload
		);

		return data;
	} catch(error) {
		logger.error(error);
		throw error;
	}
};
