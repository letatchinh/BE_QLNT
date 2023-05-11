const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    role :  {type : String,enum : ['superAdmin','staff','student'],default :'staff'},
    username : {type : String,require : true,default :''},
    password : {type : String,require : true,default :''},
    name : {type : String,require : true,default :''},
    idUser : {type : String,default :''},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('AccountSchema',Account)