const { xmlLayouts, buildXml } = require('../helpers/xmlBuilder');
const BlingClient = require('../clients/BlingClient');

module.exports.createOrder = async (orderData, generateNfe = false) => {

	const xmlString = buildXml(
		xmlLayouts.createOrderBling,
		orderData
	);

	const { pedidos, erros } = await BlingClient.createOrder(xmlString, generateNfe);

	if (erros)
		throw erros[0];

	return { orders: pedidos };
};
