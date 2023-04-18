const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    people : [{
       userId : {type:mongoose.Types.ObjectId,ref : 'user',required : true} ,
    }],
    maxUser : {type : Number, required : true , default : 1},
    idGroupRoom :{type:mongoose.Types.ObjectId,ref : 'GroupRoomSchema',required : true} ,
    floor : {type:Number,default : 1},
    equipment:{type:String,default : ''},
    roomNumber :Number,
    idBrem :{type :mongoose.Types.ObjectId,ref : 'BremSchema',required : true },
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('RoomSchema',Room)