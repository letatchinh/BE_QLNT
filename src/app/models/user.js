const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    idRoom :{type :mongoose.Types.ObjectId,ref : 'Room',required : true },
    name:{type:String,required : true},
    CMND:{type:String,default :''},
    moreInfo:{},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('UserSchema',User)