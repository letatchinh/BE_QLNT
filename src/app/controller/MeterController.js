const MeterCollection = require("../models/meter");
const mongoose = require('mongoose');
const moment = require("moment");

class MeterController {
  createMeter = async (req, res, next) => {
    try {
      const { electricity, water, idRoom , date} = req.body;
      const month = moment(date).format('MM')
      const year = moment(date).format('YYYY')
      const createMeter = await MeterCollection.create({
        electricity,
        water,
        idRoom,
        date,
        month,
        year
      });

      return res.status(201).json({ createMeter,status:true });
    } catch (error) {
      console.log(error,"error");
       throw new Error(error,"error")
    }
  };
  getMeter = async (req, res) => {
    try {
      const meters = await MeterCollection.find()
      return res.json(meters)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getOneMeter = async (req, res) => {
    try {
      const {idRoom,date} = req.query
      const month = moment(date).format('MM')
      const year = moment(date).format('YYYY')
      const meterOne = await MeterCollection.findOne({idRoom,month,year})
      return res.json(meterOne)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getPreAndMonthNow = async (req, res) => {
    try {
      const {idRoom,date} = req.query
      const month = parseInt(moment(date).format('MM'))
      const monthPre = parseInt(moment(date).subtract(1,'M').format('MM'))
      const year = parseInt(moment(date).format('YYYY'))
      console.log(monthPre,"monthPre");
      console.log(month,"month");
      console.log(year,"year");
      const meterNow = await MeterCollection.findOne({idRoom,month,year})
      const meterPre = await MeterCollection.findOne({idRoom,month:monthPre,year})
      return res.json({meterNow,meterPre})
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  createOrUpdate = async (req, res) => {
    try {
      const {idRoom,electricity, water,date} = req.body
      const month = moment(date).format('MM')
      const year = moment(date).format('YYYY')
      const meterOne = await MeterCollection.findOne({idRoom,month,year})
      if(meterOne){
        const updateMeter = await MeterCollection.findByIdAndUpdate(meterOne._id,{idRoom,month,electricity, water,year,date})
        return res.json({data :updateMeter,status:'update'})
      }
      else{
        const newMeter = await MeterCollection.create({idRoom,month,electricity, water,year ,date})
        return res.json({data :newMeter,status:'create'})
      }
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getById = async (req, res) => {
    try {
      const {id} = req.params
      const meterOne = await MeterCollection.findById(id)
      return res.json(meterOne)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  updateMeter = async (req, res) => {
    try {
      const {id} = req.params
      const meterUpdate = await MeterCollection.findByIdAndUpdate(id,req.body)
      return res.json(meterUpdate)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteMeter = async (req, res) => {
    try {
      const {id} = req.params
      await MeterCollection.deleteOne({_id:id})
      res.json("Delelte complete")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await MeterCollection.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}
  
module.exports = new MeterController();
