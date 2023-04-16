const moment = require("moment");
const bill = require("../models/bill");

class BillController {
  createBill = async (req, res, next) => {
    try {
      const { electricityNumber, waterNumber,waterUse, rent, wifi, trash,idRoom,electricityUse,totalPrice} = req.body;
      const createBill = await bill.create({ electricityNumber, waterNumber,waterUse, rent, wifi, trash,idRoom,electricityUse,totalPrice});
      return res.json({ createBill,status:true });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
  getBill = async (req, res) => {
    try {
      const bills = await bill.find()
      return res.json(bills)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getOneBill = async (req, res) => {
    try {
      const {idRoom,date} = req.query
      const startDate = moment(date).startOf('M').format('YYYY-MM-DD')
      const endDate = moment(date).endOf('M').format('YYYY-MM-DD')
      const bills = await bill.findOne({idRoom,createdAt : {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      }})
      return res.json(bills)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  deleteAll = async (req,res) => {
    try {
      await bill.deleteMany({})
      res.json("Delete all ")
    } catch (error) {
      throw new Error(error,"error")
    }
  }
  getStatistics = async (req,res) => {
    try {
      const {startDate,endDate} = req.query
      const billFound = await bill.find({
        createdAt :{
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      })
      const data = billFound.reduce((sum,curr) => {
        sum.electricityUse +=curr.electricityUse
        sum.waterUse +=curr.waterUse
        sum.totalPrice +=curr.totalPrice
        return sum
      },{waterUse : 0, electricityUse : 0,totalPrice : 0})
      res.json(data)
    } catch (error) {
      throw new Error(error,"error")
    }
  }
}

module.exports = new BillController();
