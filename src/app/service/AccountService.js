const { Types } = require("mongoose");
const account = require("../models/account");

class AccountService {
    checkExist = async (username) => {
      try {
        const result = await account.findOne({username})
        return result
      } catch (error) {
         throw new Error(error,"error")
      }
    };
    
  }
  module.exports = new AccountService();
  