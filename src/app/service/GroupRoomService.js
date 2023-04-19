const { Types } = require("mongoose");
const groupRoom = require("../models/groupRoom");
const room = require("../models/room");

class GroupRoomService {
    checkExist = async (idAccount) => {
      try {
        const result = await groupRoom.findOne({idAccount})
        return result
      } catch (error) {
         throw new Error(error,"error")
      }
    };
    checkExistNotInput = async (idAccount,id) => {
      try {
        const result = await groupRoom.findOne({_id : {$ne : id},idAccount})
        return result
      } catch (error) {
         throw new Error(error,"error")
      }
    };
    checkHaveRoom = async (id) => {
      try {
        const result = await groupRoom.findById(id)
        const count = result?.countRoom || 0
        const countRoom = await room.find({idGroupRoom : id}).countDocuments()
        if(countRoom >= count){
          return true
        }

        return false
      } catch (error) {
         throw new Error(error,"error")
      }
    };
    
  }
  module.exports = new GroupRoomService();
  