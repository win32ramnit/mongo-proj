const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    firstName: {type:String, trim:true, defaut:''},  // triming the white spcae 
    lastName: {type:String, trim:true, defaut:''},
    age: {type:Number, defaut:0},
    team: {type:String, trim:true, defaut:''},
    position: {type:String, trim:true, defaut:''}
})

module.exports = mongoose.model('Profile', Profile)