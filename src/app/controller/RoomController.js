const moment = require("moment");
const bill = require("../models/bill");
const meter = require("../models/meter");
const room = require("../models/room");
const GroupRoomService = require("../service/GroupRoomService");
const RoomService = require("../service/RoomService");

class RoomController{
    createRoom = async(req,res,next) => {
        try {
          const { electricity, water, date , roomNumber,idGroupRoom,maxUser,people} = req.body;
          const month = parseInt(moment(date).format("MM"));
          const year = parseInt(moment(date).format("YYYY"));
          const findexist = await room.findOne({roomNumber})
          const isFullRoom = await GroupRoomService.checkHaveRoom(idGroupRoom)
          if(people.length > maxUser){
            return res.json({status:false, message : 'Số người vượt quá cho phép'})
          }
          if(findexist){
            return res.json({status:false, message : 'Số phòng này đã tồn tại'})
          }else if(isFullRoom){
            return res.json({status:false, message : 'Khu nhà này đã đầy phòng'})
          }
          else{
            const data = await room.create(req.body)
            if(data){
              const meters = await meter.create({ electricity, water, idRoom : data._id , date,month,year})
            }
           return res.json({status:true,data})
          }
         
        } catch (error) {
            throw new Error(error)
        }
    }
    getRoom = async (req, res) => {
        try {
          const rooms = await room.aggregate([
            {
              $unwind:'$people'
            },
            {
                  $lookup:{
                    from:'userschemas',
                    localField:'people.userId',
                    foreignField:'_id',
                    as:'users'
                  }
            },
            {
              $unwind:'$users'
            },
            {
              $lookup:{
                from:'bremschemas',
                localField:'idBrem',
                foreignField:'_id',
                as:'brems'
              }
            },
            {
              $unwind:'$brems'
            },
            {
              $group:{
                _id:'$_id',
                users:{$push:'$users'},
                brems:{$first:'$brems'},
                equipment:{$first:'$equipment'},
                roomNumber:{$first:'$roomNumber'}
              }
            }
          ])
          const listId = rooms.map(e => e._id)
          const startDate = moment().startOf('M').format('YYYY-MM-DD')
          const endDate = moment().endOf('M').format('YYYY-MM-DD')
        const bills = await bill.find({idRoom: {$in : listId},createdAt : {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      }})
      const newRoom = rooms.map(room => {
        const findOne = bills.find(billItem => JSON.stringify(billItem.idRoom) === JSON.stringify(room._id))
        if(findOne) return {...room,bill:findOne}
        return room
      })
          return res.json(newRoom)
        } catch (error) {
          throw new Error(error,"error")
        }
      }
    deleteAll = async (req,res) => {
      try {
        await room.deleteMany({})
        res.json("Delete all ")
      } catch (error) {
        throw new Error(error,"error")
      }
    }
    getById = async (req, res) => {
      try {
        const {id} = req.params
        const findOneRoom = await room.findById(id).populate({
          path : 'people.userId',
          model : 'UserSchema'
        }).populate({
          path : 'idBrem',
          model :'BremSchema'
        })
        return res.json(findOneRoom)
      } catch (error) {
        throw new Error(error,"error")
      }
    }
    updateRoom = async (req, res) => {
      try {
        const {id} = req.params
        const RoomUpdate = await room.findByIdAndUpdate(id,req.body)
        return res.json({status:true,RoomUpdate})
      } catch (error) {
        throw new Error(error,"error")
      }
    }
    getListUser = async (req, res) => {
      try {
       
        const listUser = await RoomService.findStudentForRoom()
        return res.json({status:true,listUser})
      } catch (error) {
        throw new Error(error,"error")
      }
    }
    findRoomForUser = async (req, res) => {
      try {
       const {gender,branch,hobbys,countryside} = req.body
        const listUser = await RoomService.findRoomForStudent({gender,branch,hobbys,countryside})
        return res.json({status:true,data:listUser})
      } catch (error) {
        throw new Error(error,"error")
      }
    }
    addOneUserToRoom = async (req, res) => {
      try {
        const {id} = req.params
       const {newUser} = req.body
        const listUser = await room.findByIdAndUpdate(id,{$push : {people : newUser}},{new : true})
        if(listUser){
          return res.json({status:true,data:listUser})
        }else{

          return res.json({status:false,message : 'Lỗi gì đó'})
        }
      } catch (error) {
        throw new Error(error,"error")
      }
    }
}
module.exports = new RoomController