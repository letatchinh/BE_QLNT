const { Types } = require("mongoose");
const groupRoom = require("../models/groupRoom");

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
    
  }
  module.exports = new GroupRoomService();
  