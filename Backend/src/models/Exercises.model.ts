const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String},
  sets: { type: String},
  reps: {type: String},
  holdTime: {type: String},
  weight: {type: String},
  turnsPerMinute: {type: String},
  is_deleted:{type:Boolean,default:false}
}, { timestamps: true });

const ExerciseModal = mongoose.model('Exercise', exerciseSchema);

export default ExerciseModal;
