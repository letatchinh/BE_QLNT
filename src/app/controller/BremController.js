const BremCollection = require("../models/brem");
const BremService = require("../service/BremService");
const { getLastBremNumber } = require("../service/BremService");

class BremController {
  createBrem = async (req, res, next) => {
    try {
      const { electricityPrice, waterPrice, rent, wifi, trash ,name ,bremNumber} = req.body;
      const createBrem = await BremCollection.create({
        electricityPrice,
        waterPrice,
        rent,
        wifi,
        trash,
        name,
        bremNumber : bremNumber || 0
      });

      return res.status(201).json({ createBrem,status:true });
    } catch (error) {
      console.log(error,"error");
       throw new Error(error,"error")
    }
  };
  getBream = async (req, res) => {
    try {
      const brems = await BremCollection.find()
      return res.json(brems)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getOneBream = async (req, res) => {
    try {
      const {id} = req.params
      const bremOne = await BremCollection.findById(id)
      return res.json(bremOne)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  updateBrem = async (req, res) => {
    try {
      const {id} = req.params
      const bremUpdate = await BremCollection.findByIdAndUpdate(id,req.body)
      return res.json(bremUpdate)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getLastBremNumber = async (req, res) => {
    try {
      const lastBrem = await getLastBremNumber()
       res.json({lastBrem})
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteBrem = async (req, res) => {
    try {
      const {id} = req.params
      const exist = await BremService.findBremIsExistRoom(id)
      if(exist.length > 0) {
        res.json({status:false, data:exist})
      }
      else{
        res.json({status:true})
        await BremCollection.deleteOne({_id:id})
      }
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await BremCollection.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
  
module.exports = new BremController();
