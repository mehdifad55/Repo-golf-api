const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({

     nom: {
         type: String,
         required: true,
         min: 6,
         max: 255

     },
     prenom: {
        type: String,
        required: true,
        min: 6,
        max: 255

     },
     email: {
         type: String,
         required: true,
         max: 255,
         min: 6
     },
     telephone: {
        type: Number,
        required: true,
        max: 9999999999,
        min: 1000000000
     }
    
}); 

module.exports = mongoose.model('Manager',managerSchema);