const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    role :  {type : String,enum : ['superAdmin,staff'],default :'staff'},
    username : String,
    password : String,
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('AccountSchema',Account)