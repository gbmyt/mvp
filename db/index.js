const mongoose = require("mongoose");
var getYogaPoses = require("../helpers/poses");

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect("mongodb://localhost/yogizone");
}

// =========================
//         Poses
// =========================
const poseSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  sanskrit_name: String,
  english_name: String,
  img_url: String,
  created_at: Date,
  updated_at: Date,
}, { collection: 'poses' });

const Pose = mongoose.model("Pose", poseSchema);

// Save yoga poses to db
let save = (poses) => {
  // Save them to db
  console.log("Saving Poses");

  poses.forEach((pose) => {
    let currentPose = new Pose(pose);
    currentPose.save();
  });
};

// =========================
//        Routines
// =========================

// if time:
// allow users to create/update/delete poses and routine playlists

// Routines Schema
const routineSchema = mongoose.Schema({
  type: String,
  name: { type: String, required: true, trim: true },
  poses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pose'
    }],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'routines' });

const Routine = mongoose.model("Routine", routineSchema);

routineSchema.methods.findRoutines = function(cb) {
  return mongoose.model('Routine').find(cb);
};

// Save routines to db
let saveRoutine = async (userRoutine) => {
  await mongoose.connect('mongodb://localhost/yogizone');
  mongoose.model('Pose', poseSchema);

  var poses = await mongoose.model('Pose').find();

  let routine = userRoutine || new Routine({
    type: 'routine',
    name: 'All Poses',
    poses: [...poses]
  });
  routine.save();
};

let findRoutines = async () => {
  console.log('inside findRoutines');
  // await mongoose.connect('mongodb://localhost/yogizone');
  // mongoose.model('Routine', routineSchema);

  // var routines = Routine.find();
  // console.log('find routines', routines.db);
  // cb(routines);
};

module.exports.save = save;
module.exports.saveRoutine = saveRoutine;
module.exports.findRoutines = findRoutines;
