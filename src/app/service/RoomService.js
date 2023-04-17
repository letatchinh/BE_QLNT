
const moment = require("moment");
const room = require("../models/room");

class RoomService {
    getById = async(id) => {
       try {
        const findOneRoom = await room.findById(id).populate({
          path : 'people.userId',
          model : 'UserSchema'
        }).populate({
          path : 'idBrem',
          model :'BremSchema'
        })
        return findOneRoom
       } catch (error) {
        
       }
    }

    
  }
  module.exports = new RoomService();
  