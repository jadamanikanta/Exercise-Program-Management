const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  Programname: { type: String},
  selectCombo: { type: [String] }, 
  exerciseProgramme: { type: [String] }, 
  dayofweek: { type: [String] },
  notes:{type:String},
  is_deleted:{type:Boolean,default:false}
}, { timestamps: true });

const ProgramModal = mongoose.model('programs', programSchema);

export default ProgramModal;