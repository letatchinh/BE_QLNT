
const moment = require("moment");
const { Types } = require("mongoose");
const room = require("../models/room");

class UserService {
    findUserIsExistRoom = async(id) => {
       try {
        const userExist = await room.findOne({
            people : {
                $elemMatch : {
                    'userId' : {
                        $in : [id]
                    }
                }
            }
        })
        return userExist
       } catch (error) {
        
       }
    }

    
  }
  module.exports = new UserService();
  