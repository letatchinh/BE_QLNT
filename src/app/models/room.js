const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    people : [{
        type:mongoose.Types.ObjectId,ref : 'user',required : true ,
    }],
    idBrem :{type :mongoose.Types.ObjectId,ref : 'BremSchema',required : true },
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('RoomSchema',Room)