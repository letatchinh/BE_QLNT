
const moment = require("moment");
const { Types } = require("mongoose");
const room = require("../models/room");
const user = require("../models/user");

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
    findByUsername = async (username) => {
        try {
          const result = await user.findOne({username})
          return result
        } catch (error) {
           throw new Error(error,"error")
        }
      };
    
  }
  module.exports = new UserService();
  