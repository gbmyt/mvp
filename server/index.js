var express = require("express");
var app = express();
var path = require("path");
var port = 3000;

var getYogaPoses = require("../helpers/poses");
var {
  save,
  saveRoutine,
  getRoutine,
  getRoutines,
  getPoses,
} = require("../db/index");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Save Poses to Database (maybe this shouldn't be done on every GET to home?)
app.get("/", async (req, res, next) => {
    await getYogaPoses(async (poses) => {
      await save(poses);
      console.log("Done Saving");
    });
    next();
  })
  .use(express.static("client"));

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

// Get And Display Poses For Selected Routine
app.get("/routine/poses", async (req, res) => {
  var data = await getPoses();
  console.log("Get Poses Result", data);
  res.send("Poses for selected routine");
  // res.send(data);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${port}`);
});
