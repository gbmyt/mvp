const axios = require('axios');

var getYogaPoses = () => {
	// GET poses from
	const url = 'https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json';

	axios.get(url)
	.then((results) => {
		console.log('GET Poses', results);
	})
	.catch((err) => {
		console.log(err);
	});
};

module.exports = getYogaPoses;