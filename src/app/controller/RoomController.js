const room = require("../models/room");

class RoomController{
    createRoom = async(req,res,next) => {
        try {
            const data = req.body
           return res.json({data})
        } catch (error) {
            return next(new ErrorHander(e, 400));
        }
    }
}
module.exports = new RoomController