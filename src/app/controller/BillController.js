const moment = require("moment");
const bill = require("../models/bill");
const NodeMailer = require("../service/NodeMailer");
const RoomService = require("../service/RoomService");

class BillController {
  createBill = async (req, res, next) => {
    try {
      const { electricityNumber, waterNumber,waterUse, rent, wifi, trash,idRoom,electricityUse,totalPrice} = req.body;
      const createBill = await bill.create({ electricityNumber, waterNumber,waterUse, rent, wifi, trash,idRoom,electricityUse,totalPrice});
      if(createBill){
        const findRoom = await RoomService.getById(idRoom)
        // const email = findRoom.people[0].userId.email
        // const statusSendEmail = await NodeMailer.sendMail({email,html})
        return res.json({ createBill,status:true });
      }
      else{
        return res.json({status:false });
      }
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
      const {startDate,endDate,idRoom} = req.query
    const querys = {
      createdAt :{
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      },
    }
    const querysIdRoom = {
      createdAt :{
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      },
      idRoom
    }
      const billFound = await bill.find(idRoom ? querysIdRoom  : querys)
    //   const billFound = await bill.aggregate([
    //     {
    //     $match:{
    //       createdAt :{
    //         $gte: new Date(startDate),
    //         $lt: new Date(endDate)
    //       },
    //     }
    //   },
    //   {
    //     idRoom:{
    //       $cond:{
    //         if:{idRoom:{$exists:true}},
    //         then:Types.ObjectId(idRoom),
    //         else:{}
    //       }
    //     }
    //   }
    // ])
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
