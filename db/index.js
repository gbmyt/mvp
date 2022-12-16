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
  sanskrit_name: String,
  english_name: String,
  img_url: String,
  created_at: Date,
  updated_at: Date,
}, { collection: 'poses' });

const Pose = mongoose.model("Pose", poseSchema);

// Save yoga poses to db
let save = (poses) => {
  console.log("Saving Poses");

  poses.forEach((pose) => {
    let currentPose = new Pose(pose);
    currentPose.save();
  });
};

// =========================
//        Routines
// =========================
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

routineSchema.methods.findRoutines = function(cb) {
  return mongoose.model('Routine').find(cb);
};

// Save routines to db
let saveRoutine = async (userRoutine) => {
  mongoose.model('Pose', poseSchema);
  var poses = await mongoose.model('Pose').find();
  // console.log('saveR poses', poses);

  let routine = userRoutine || new Routine({
    type: 'routine',
    name: 'All Poses',
    poses: [...poses]
  });
  routine.save();
};

let findRoutinePoses = async (name) => {
  console.log('inside findRoutinePoses');

  let rName = name || "All Poses";

  Routine.findOne({ "name": rName }, (err, routine) => {
    if (err) {
      console.log(err)
    }
    let poses = routine.poses;

    poses.forEach(pose => {
      Pose.findOne({ _id: pose._id }, (err, result) => {
        if(err) {
          console.log(err);
        }
        console.log(result);
      })
    })
  });
};

module.exports.save = save;
module.exports.saveRoutine = saveRoutine;
module.exports.findRoutinePoses = findRoutinePoses;
