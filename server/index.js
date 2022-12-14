var express = require("express");
var app = express();
var port = 3000;

var getYogaPoses = require('../helpers/poses');
var save = require('../db/index');

app.use('/', express.static("client"));

// add ability to get a single pose / endpoint for that
app.get('/poses', (req, res) => {
	getYogaPoses(poses => {
		console.log("Saving Poses");
		save(poses);
		console.log("Done Saving");
	});
	res.end();
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${port}`);
});
