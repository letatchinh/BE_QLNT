const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    idRoom :{type :mongoose.Types.ObjectId,ref : 'Room'},
    gender:{type:String,enum : ['male','female'],required : true,default : 'male'},
    MaSv:{type:String,required : true,default : ''},
    branch:{type:String,required : true,default : ''},
    name:{type:String,required : true,default : ''},
    hobbys:[],
    CMND:{type:String,default :''},
    email:{type:String,default :''},
    phone:{type:Number,default :0},
    moreInfo:{},
    countryside:{type:String,default :''},
    createdAt : {type : Date,default :Date.now},
    updatedAt : {type : Date,default :Date.now},
})
module.exports = mongoose.model('UserSchema',User)