var express = require("express");
var app = express();
var path = require("path");
var port = 3000;


// TODOs:
// Redirect to indiv routine page/endpoint
// Render player on routine page
// Pagination


var getYogaPoses = require("../helpers/poses");
var {
  save,
  saveRoutine,
  getRoutines,
  getPoses,
} = require("../db/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Save Poses to Database (maybe this shouldn't be done on every GET to home?)
app.get("/", async (req, res, next) => {
    await getYogaPoses(async (poses) => {
      await save(poses);
      console.log("Done Saving");
    });
    next();
}).use(express.static("client"));

app.get("/routines", async (req, res) => {
  console.log("Fetching Routines");
  var data = await getRoutines();
  res.send(data);
});

// Save A New Routine
app.post("/routine/create", async (req, res) => {
  await saveRoutine();
  console.log("Saved New Routine");
  res.sendStatus(res.statusCode);
});

app.get("/routine/:id", async (req, res) => {
	var poses = await getPoses(req.params['id']);
	// console.log('Got Routine\'s Poses', poses);
	// res.send(poses);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${port}`);
});
