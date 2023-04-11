const brem = require("../models/brem");

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
    
  }
  module.exports = new BremService();
  