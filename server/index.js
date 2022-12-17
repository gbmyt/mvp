var express = require("express");
var app = express();
var path = require('path');
var port = 3000;

var getYogaPoses = require('../helpers/poses');
var { save, saveRoutine, getRoutine, getRoutines, getPoses } = require('../db/index');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/', async (req, res, next) => {
	console.log('Got home page');
	var routines = await getRoutines();
	console.log('Fetching Routines');
	next();
})

app.use(express.static('client'));

app.get('/poses', (req, res) => {
	getYogaPoses(async poses => {
		await save(poses);
		console.log("Done Saving");
	});
	res.sendStatus(res.statusCode);
});

app.post('/routine/create', async (req, res) => {
	await saveRoutine();
	console.log('Saved New Routine')
	res.sendStatus(res.statusCode);
});

app.get('/routine/poses', async (req, res) => {
	var data = await getPoses();
	res.send(data);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${port}`);
});
