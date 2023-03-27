const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
    idRoom :{type :mongoose.Types.ObjectId,ref : 'RoomSchema',require : 'true' },
    status:{type : Boolean , enum : ['PAID','NOT_PAID'] , default : 'NOT_PAID'},
    electricityNumber : {type : Number , required : true, default : 0},
    waterNumber : {type : Number , required : true, default : 0},
    rent : {type : Number , required : true, default : 0},
    wifi : {type : Number , required : true, default : 0},
    trash : {type : Number , required : true, default : 0},
    totalPrice : {type : Number , required : true, default : 0},
    date : {type : Date},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('BillSchema',Bill)