const hobby = require("../models/hobby");

class HobbyController {
  createHobby = async (req, res, next) => {
    try {
      const { name} = req.body;
      const isExist = await hobby.findOne({name})
      if(isExist){
        return res.json({message : "Đã tồn tại sở thích này",status : false})
      }
      const createHobby = await hobby.create({
        name
      });
      return res.json({ createHobby,status:true });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  getOneHobby = async (req, res, next) => {
    try {
      const {id} = req.params
      const hobbyOne = await hobby.findById(id);
      return res.json({ hobbyOne });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  getHobbys = async (req, res, next) => {
    try {
      // const {id} = req.params
      const hobbys = await hobby.find();
      return res.json(hobbys);
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  updateHobby = async (req, res) => {
    try {
      const {id} = req.params
      const {name} = req.body
      const isExist = await hobby.findOne({name,_id : {$ne : id}})
      if(isExist){
        return res.json({message : "Đã tồn tại sở thích này",status : false})
      }
      const HobbyUpdate = await hobby.findByIdAndUpdate(id,req.body)
      return res.json({HobbyUpdate,status : true})
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await hobby.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
module.exports = new HobbyController();
