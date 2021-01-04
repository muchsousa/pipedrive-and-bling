const xmlLayouts = require('./xmlLayouts');

const createTag = (tag, value) => value ? `<${tag}>${value}</${tag}>` : '';

const resolvePath = (path = '', data) => {
	const itens = path.split('.');

	let dataItem = Object.assign({}, data);
	for (const item of itens) {
		if (dataItem && dataItem[item])
			dataItem = typeof dataItem[item] === 'object' ? Object.assign({}, dataItem[item]) : dataItem[item];
		else
			return '';
	}

	return dataItem || '';
};

const processXmlTree = (layoutTree, data) => {
	const { fields, path, tag, fn } = layoutTree;

	let value;

	if (fields && fields.length) {
		value = fields.map(layoutSubTree => {
			const { fields, path, tag, fn } = layoutSubTree;

			if (fields && fields.length)
				return processXmlTree(layoutSubTree, data);

			if (path) {
				const pathValue = resolvePath(path, data);
				const tagValue = fn ? fn(pathValue) : pathValue;

				return createTag(tag, tagValue);
			}
		}).join('');
	}

	if (path) {
		const pathValue = resolvePath(path, data);
		const tagValue = fn ? fn(pathValue) : pathValue;

		return createTag(tag, tagValue);
	}
    
	return createTag(tag, value);
};

module.exports.xmlLayouts = { ...xmlLayouts };

module.exports.buildXml = (xmlLayout, xmlData) => `
	<?xml version="1.0" encoding="UTF-8"?>
	${processXmlTree(xmlLayout, xmlData)}
`;
