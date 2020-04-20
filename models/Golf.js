const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const golfSchema = new mongoose.Schema({

     titre: {
         type: String,
         required: true,
         min: 6,
         max: 255

     },
      latitude: {
         type: Number,
         required: true,
         max: 90,
         min: -90

     },
     longitude: {
         type: Number,
         required: true,
         max: 180,
         min: -180
     },
     description: {
        type: String,
        required: true,
        max: 255,
        min: 6
     },
     manager: {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'Manager',
         unique: true
     }
    
});
golfSchema.plugin(mongooseUniqueValidator); 

module.exports = mongoose.model('Golf',golfSchema);