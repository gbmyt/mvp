const axios = require('axios');

var getYogaPoses = (cb) => {
	const url = 'https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json';

	axios.get(url)
	.then((results) => {
		console.log('Getting Poses');
		cb(results.data);
	})
	.catch((err) => {
		console.log(err);
	});
};

module.exports = getYogaPoses;