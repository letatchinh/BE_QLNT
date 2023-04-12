const room = require("../models/room");

class RoomController{
    createRoom = async(req,res,next) => {
        try {
            const {roomNumber} = req.body
            const data = await room.create(req.body)

           return res.json({data})
        } catch (error) {
            return next(new ErrorHander(e, 400));
        }
    }
    getRoom = async (req, res) => {
        try {
          const rooms = await room.find()
          return res.json(rooms)
        } catch (error) {
          throw new Error(error,"error")
        }
      }
}
module.exports = new RoomController