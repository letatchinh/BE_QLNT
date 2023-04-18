const groupRoom = require("../models/groupRoom");
const GroupRoomService = require("../service/GroupRoomService");

class GroupRoomController {
  createGroupRoom = async (req, res, next) => {
    try {
      const {idAccount} = req.body
      const exist = await GroupRoomService.checkExist(idAccount)
      if(!exist) {
        const createGroupRoom = await groupRoom.create({
          ...req.body
         });
         return res.json({ createGroupRoom,status:true });
      }
      else{
         return res.json({ message:`Người này đã được quản lý  ${exist?.name || ''}`,status:false });
      }
      
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  getOneGroupRoom = async (req, res, next) => {
    try {
      const {id} = req.params
      const groupRoomOne = await groupRoom.findById(id);
      return res.json({ groupRoomOne });
    } catch (error) {
      throw new Error(error,"error")
    }
  }

  getGroupRooms = async (req, res, next) => {
    try {
      // const {id} = req.params
      const groupRooms = await groupRoom.find().populate({path : 'idAccount', model : 'AccountSchema'})
      return res.json(groupRooms);
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  updateGroupRoom = async (req, res) => {
    try {
      const {id} = req.params
      const {idAccount} = req.body
      const exist = await GroupRoomService.checkExistNotInput(idAccount,id)
      if(exist){
        return res.json({ message:`Người này đã được quản lý  ${exist?.name || ''}`,status:false });
      }
      else{
        const GroupRoomUpdate = await groupRoom.findByIdAndUpdate(id,req.body)
        return res.json({data : GroupRoomUpdate,status:true})
      }
      
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await groupRoom.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
module.exports = new GroupRoomController();
