var express = require("express");
var app = express();
var port = 3000;

var getYogaPoses = require('../helpers/poses');

app.use('/', express.static("client"));

app.get('/poses', (req, res) => {
	var poses = getYogaPoses();
  console.log("Poses", poses);
	res.send(res.statusCode);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${port}`);
});
