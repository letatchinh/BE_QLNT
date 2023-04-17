const user = require("../models/user");
const UserService = require("../service/UserService");

class UserController {
  createUser = async (req, res, next) => {
    try {
      const { name, CMND,countryside,phone,email } = req.body;
      const createUser = await user.create({
        countryside, name, CMND,phone,email
      });
      return res.json({ createUser });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  getOneUser = async (req, res, next) => {
    try {
      const {id} = req.params
      const userOne = await user.findById(id);
      return res.json({ userOne });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  updateUser = async (req, res, next) => {
    try {
      const {id} = req.params
      const userUpdate = await user.findByIdAndUpdate(id,req.body);
      return res.json({ userUpdate });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  getUsers = async (req, res, next) => {
    try {
      // const {id} = req.params
      const users = await user.find();
      return res.json(users);
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  updateUser = async (req, res) => {
    try {
      const {id} = req.params
      const UserUpdate = await user.findByIdAndUpdate(id,req.body)
      return res.json(UserUpdate)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteUser = async (req, res) => {
    try {
      const {id} = req.params
      const exist = await UserService.findUserIsExistRoom(id)
      if(exist) {
        res.json({status:false, data:exist})
      }
      else{
        res.json({status:true})
        await user.deleteOne({_id:id})
      }
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await user.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
module.exports = new UserController();
