module.exports = {
	'env': {
		'node': true,
		'es6': true,
		'commonjs': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 10
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
