const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestJoinRoom = new Schema({
    idRoom :  {type:mongoose.Types.ObjectId,ref : 'RoomSchema',required : true} ,
    idUser : {type:mongoose.Types.ObjectId,ref : 'UserSchema',required : true},
    status :  {type : String,enum : ['NEW','CONFIRM','DENY'],default :'NEW'},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('RequestJoinRoomSchema',RequestJoinRoom)