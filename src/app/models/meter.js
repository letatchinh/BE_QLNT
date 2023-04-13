const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Meter = new Schema({
    idRoom :  {type:mongoose.Types.ObjectId,ref : 'room',required : true} ,
    date:{type:Date},
    month:Number,
    year:Number,
    electricity : {type : Number , required : true, default : 0},
    water: {type : Number , required : true, default : 0},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('MeterSchema',Meter)