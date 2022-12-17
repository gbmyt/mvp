const mongoose = require("mongoose");
var getYogaPoses = require("../helpers/poses");

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect("mongodb://localhost/yogizone");
}

// ===============================
//            Poses
// ===============================
const poseSchema = mongoose.Schema({
  sanskrit_name: String,
  english_name: String,
  img_url: String,
  created_at: Date,
  updated_at: Date,
}, { collection: 'poses' });

const Pose = mongoose.model("Pose", poseSchema);

// Poses Model Helper Methods
let save = (poses) => {
  console.log("Saving Poses");

  poses.forEach((pose) => {
    let currentPose = new Pose(pose);
    currentPose.save();
  });
};

// ===============================
//            Routines
// ===============================
const routineSchema = mongoose.Schema({
  type: String,
  name: { type: String, required: true, unique: true, trim: true },
  poses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pose'
    }],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'routines' });

const Routine = mongoose.model("Routine", routineSchema);

// Routine Model Helper Methods
let saveRoutine = async (userRoutine) => {
  var poses = await Pose.find();

  let routine = userRoutine || new Routine({
    type: 'routine',
    name: 'All Poses',
    poses: [...poses]
  });
  await routine.save();
};

let getRoutines = async () => {
  var routines = await Routine.find();
  return routines;
};

let getRoutine = async (name) => {
  console.log('inside getRoutine');

  let rName = name || "All Poses";
  var routine = await Routine.find({ "name": rName });
  return routine;
};

let getPoses = async (routine) => {
  console.log('Getting Routine Poses');
  var r = routine || 'All Poses';
  var routine = await Routine.findOne({ 'name': r });
  var poses = [];

  routine.poses.forEach(async pose => {
    let current = await Pose.find({ _id: routine.poses[i]._id });
    poses.push(current[0]);
  })
  return poses;
};


module.exports.save = save;
module.exports.saveRoutine = saveRoutine;
module.exports.getRoutine = getRoutine;
module.exports.getRoutines = getRoutines;
module.exports.getPoses = getPoses;

