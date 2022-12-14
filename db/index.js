const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect("mongodb://localhost/poses");
}

var getYogaPoses = require("../helpers/poses");

// if time:
// allow users to create/update/delete poses and routine playlists

// Poses Schema
const poseSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  sanskrit_name: String,
  english_name: String,
  img_url: String,
  created_at: Date,
  updated_at: Date,
});

const Pose = mongoose.model("Pose", poseSchema);

// Routines Schema
// const routines = new mongoose.Schema;

// set up save method to save yoga poses to db
let save = (poses) => {
  console.log("inside db save function");

  // Save them to db
  poses.forEach((pose) => {
    let currentPose = new Pose(pose);
    console.log("currentPose", currentPose.sanskrit_name);
    currentPose.save();
  });
};

module.exports = save;
