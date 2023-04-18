const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupRoom = new Schema({
    idAccount : {type :mongoose.Types.ObjectId,ref : 'AccountSchema',require : 'true' },
    name : {type :String,require : 'true' },
    countRoom : {type : Number , default : 1},
    countFloor:{type : Number , default : 1},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('GroupRoomSchema',GroupRoom)