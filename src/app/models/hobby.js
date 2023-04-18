const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hobby = new Schema({
    name:{type :String , require : true,default : ''},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('HobbySchema',Hobby)