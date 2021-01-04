const { config } = require('dotenv');
config();

module.exports = {

	server: {
		port: process.env.SERVER_PORT || 3000
	},

	mongo: {
		urlConnection: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
	},
	
	webhook: {
		baseURL: process.env.WEBHOOK_URL || ''
	},

	integrations: {

		bling: {
			url: process.env.BLING_URL || '',
			key: process.env.BLING_KEY || ''
		},

		pipedrive: {
			url: process.env.PIPEDRIVE_URL || '',
			key: process.env.PIPEDRIVE_KEY || ''
		}
	}

};
