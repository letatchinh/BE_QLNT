const account = require("../models/account");
const AccountService = require("../service/AccountService");

class AccountController {
  createAccount = async (req, res, next) => {
    try {
      const {username} = req.body
      const isExist = await AccountService.checkExist(username)
      if(isExist){
        return res.json({ status:false,message:'Tài khoản đã bị trùng' });
      }
      const createAccount = await account.create({
       ...req.body
      });
      return res.json({ createAccount,status:true });
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  getOneAccount = async (req, res, next) => {
    try {
      const {id} = req.params
      const accountOne = await account.findById(id);
      return res.json({ accountOne });
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  login = async (req, res, next) => {
    try {
      const {username,password} = req.body
      const accountOne = await account.findOne({username,password});
      if(accountOne){
        return res.json({ accountOne,status:true });
      }
      else
      {
        return res.json({ status:false });
      }
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  getAccounts = async (req, res, next) => {
    try {
      // const {id} = req.params
      const accounts = await account.find();
      return res.json(accounts);
    } catch (error) {
      throw new Error(error,"error")
    }
  };
  updateAccount = async (req, res) => {
    try {
      const {id} = req.params
      const AccountUpdate = await account.findByIdAndUpdate(id,req.body)
      return res.json({data : AccountUpdate,status:true})
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await account.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
module.exports = new AccountController();
