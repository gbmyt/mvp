
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
  english_name: {
    type: String,
    required: true,
    index: { unique: true, background: false }
  },
  img_url: String,
  created_at: Date,
  updated_at: Date,
}, { collection: 'poses' });

const Pose = mongoose.model("Pose", poseSchema);

// Poses Model Helper Methods
let save = async (poses) => {
  console.log("Saving Poses");

  await poses.forEach((pose) => {
    let currentPose = new Pose(pose);
    try {
      Pose.findOne({ 'english_name': pose.english_name }, (err, result) => {
        if (err) console.error(err);
        if (!result) { currentPose.save() }
      })
    } catch (err) {
      console.error(err);
    }
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

let getRoutines = async (cb) => {
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

  for (var i = 0; i < routine.poses.length; i++) {
    let pose = await Pose.find({ _id: routine.poses[i]._id });
    poses.push(pose[0]);
  }
  return poses;
};

module.exports.save = save;
module.exports.saveRoutine = saveRoutine;
module.exports.getRoutine = getRoutine;
module.exports.getRoutines = getRoutines;
module.exports.getPoses = getPoses;