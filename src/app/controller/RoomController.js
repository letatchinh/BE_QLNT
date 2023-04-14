const moment = require("moment");
const bill = require("../models/bill");
const meter = require("../models/meter");
const room = require("../models/room");

class RoomController{
    createRoom = async(req,res,next) => {
        try {
          const { electricity, water, date , roomNumber} = req.body;
          const month = parseInt(moment(date).format("MM"));
          const year = parseInt(moment(date).format("YYYY"));
          const findexist = await room.findOne({roomNumber})
          if(findexist){
            return res.json({status:false, message : 'Số phòng này đã tồn tại'})
          }
            const data = await room.create(req.body)
            if(data){
              const meters = await meter.create({ electricity, water, idRoom : data._id , date,month,year})
            }
           return res.json({status:true,data})
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
      console.log(bills,"bills");
      const newRoom = rooms.map(room => {
        const findOne = bills.find(billItem => JSON.stringify(billItem.idRoom) === JSON.stringify(room._id))
        console.log(findOne,"findOne");
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
}
module.exports = new RoomController