const moment = require('moment');

module.exports = {
	tag: 'pedido',
	fields: [
		{
			tag: 'data',
			path: 'date',
			fn: value => moment(value).format('DD/MM/AAAA')
		},
		{
			tag: 'cliente',
			fields: [
				{
					tag: 'nome',
					path: 'customer.name'
				}
			]
		},
		{
			tag: 'itens',
			fields: [
				{
					tag: 'item',
					fields: [
						{
							tag: 'codigo',
							path: 'item.code'
						},
						{
							tag: 'descricao',
							path: 'item.description'
						},
						{
							tag: 'qtde',
							path: 'item.quantity'
						},
						{
							tag: 'vlr_unit',
							path: 'item.unit_value'
						}
					]
				}
			]
		},
		{
			tag: 'obs',
			path: 'description'
		},
	]
};
