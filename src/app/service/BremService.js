const { Types } = require("mongoose");
const brem = require("../models/brem");
const room = require("../models/room");

class BremService {
    getLastBremNumber = async () => {
      try {
        const result = await brem.findOne().sort({createdAt: 'desc'}).exec()
        if(result) {
          return result
        }
        else{
          return 0
        }
      } catch (error) {
        console.log(error,"error");
         throw new Error(error,"error")
      }
    };
    findBremIsExistRoom = async(id) => {
      try {
       const bremExist = await room.find({
        idBrem : id
       })
       return bremExist
      } catch (error) {
       
      }
   }
    
  }
  module.exports = new BremService();
  