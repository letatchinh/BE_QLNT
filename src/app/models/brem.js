const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Brem = new Schema({
    bremNumber :Number,
    name :String,
    electricityPrice : {type : Number , required : true, default : 0},
    waterPrice: {type : Number , required : true, default : 0},
    rent : {type : Number , required : true, default : 0},
    wifi : {type : Number , required : true, default : 0},
    trash : {type : Number , required : true, default : 0},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('BremSchema',Brem)