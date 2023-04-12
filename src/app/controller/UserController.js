const user = require("../models/user");

class UserController {
  createUser = async (req, res, next) => {
    try {
      const { name, CMND,countryside } = req.body;
      const createUser = await user.create({
        countryside, name, CMND
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
}
module.exports = new UserController();
