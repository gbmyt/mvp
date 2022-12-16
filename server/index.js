var express = require("express");
var app = express();
var port = 3000;

var getYogaPoses = require('../helpers/poses');
var { save, saveRoutine, findRoutinePoses } = require('../db/index');

app.use('/', express.static("client"))

app.get('/routines', (req, res) => {
	// get routines and log them here
	findRoutinePoses();
});

app.post('/routines', (req, res) => {
	saveRoutine();
	res.sendStatus(res.statusCode);
});

// add ability to get a single pose / endpoint for that
app.get('/poses', async (req, res) => {
	await getYogaPoses(poses => {
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
