module.exports = {
	info: info => console.log('\033[34m [info]', '\033[0m', info),
	warn: warn => console.log('\033[33m [warn]', '\033[0m', warn),
	error: error => console.error('\033[31m [error]', '\033[0m', error),
};
