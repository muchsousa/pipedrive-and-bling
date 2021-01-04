const logger = require('../logger');
const { webhook: webhookConfig } = require('../config');

const PipedriveClient = require('../clients/PipedriveClient');

module.exports.configureDealWebhook = async () => {

	try {
		if (!webhookConfig.baseURL){
			logger.warn('webhook base url not defined');
			return;
		}

		const subscriptionUrl = `${webhookConfig.baseURL}/webhook`;

		const { data: webhooksCreated = [] } = await PipedriveClient.getWebHooks();

		const alreadyDealWebhook = webhooksCreated.some(webhook => 
			webhook.event_object === 'deal' && webhook.event_action === 'updated' && webhook.subscription_url === subscriptionUrl
		);
		
		if (alreadyDealWebhook) {
			logger.info(`webhook already configured for subscription url: ${subscriptionUrl}`);
			return;
		}

		logger.info(`configuring webhook for subscription url: ${subscriptionUrl}`);
			
		const webhookPayload = {
			subscription_url: subscriptionUrl,
			event_action: 'updated',
			event_object: 'deal'
		};

		await PipedriveClient.createWebHook(webhookPayload);
	} catch(error) {
		logger.error(`error on configure pipedrive webhook. Message: ${error.message}`);
	}
};
