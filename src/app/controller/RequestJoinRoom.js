const groupRoom = require("../models/groupRoom");
const requestJoinRoom = require("../models/requestJoinRoom");
const room = require("../models/room");
const RoomService = require("../service/RoomService");

class RequestJoinRoomController {
  createRequestJoinRoom = async (req, res, next) => {
    try {
      const createRequestJoinRoom = await requestJoinRoom.create({
       ...req.body
      });
      return res.json({ data :createRequestJoinRoom,status:true });
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  getOneRequestJoinRoom = async (req, res, next) => {
    try {
      const {id} = req.params
      const requestJoinRoomOne = await requestJoinRoom.findById(id);
      return res.json({ requestJoinRoomOne });
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  getRequestJoinRooms = async (req, res, next) => {
    try {
      const {id,role} = req.query
      const requestJoinRooms = await requestJoinRoom.find().sort({createdAt : -1}).populate('idUser').populate('idRoom');
      console.log(id,"id");
      console.log(role,"role");
      if(id && role) {
        if(role === 'superAdmin'){
          return res.json(requestJoinRooms);
        }
        const groupRooms = await groupRoom.find({idAccount : id})
        const requestOfStaff = requestJoinRooms?.filter(e => {
          const findOne = groupRooms.some(g => JSON.stringify(g._id) === JSON.stringify(e?.idUser?.idGroupRoom))
          return findOne
          })
        return  res.json(requestOfStaff);
  
      }
      return res.json(requestJoinRooms); 
    
     
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  updateRequestJoinRoom = async (req, res) => {
    try {
      const {id} = req.params
      const {status,idStudent,roomId} = req.body
      if(status === 'CONFIRM'){
        const isExist = await RoomService.checkIsStudentHaveRoom(idStudent)
        if(isExist){
            return res.json({message: "Sinh viên đã có phòng",status:false})
        }
        else{
            await room.findByIdAndUpdate(roomId,{$push : {people : {userId : idStudent}}},{new : true})
        }
      }
      const RequestJoinRoomUpdate = await requestJoinRoom.findByIdAndUpdate(id,req.body,{new : true})
      
      return res.json({data : RequestJoinRoomUpdate,status:true})
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await requestJoinRoom.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
module.exports = new RequestJoinRoomController();
