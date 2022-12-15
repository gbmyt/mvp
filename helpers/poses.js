const axios = require('axios');

var getYogaPoses = (cb) => {
	// GET poses from
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

var getNextPose = () => {
	// get next pose and display it to Player component
};

module.exports = getYogaPoses;