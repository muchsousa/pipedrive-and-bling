const axios = require('axios');
const logger = require('../logger');

const { integrations: integrationsConfig } = require('../config');

const client = axios.create({ 
	baseURL: integrationsConfig.bling.url,
	timeout: 15000
});

module.exports.createOrder = async (xmlString, generateNfe = false) => {
	try {
		const { data: { retorno } } = await client.post(
			`pedido/json/?apikey=${integrationsConfig.bling.key}&xml=${encodeURIComponent(xmlString)}&gerarnfe=${generateNfe}`
		);

		return retorno;
	} catch(error) {
		logger.error(error);
		throw error;
	}
};
