const brem = require("../models/brem");

class BremController {
  createBrem = async (req, res, next) => {
    try {
      const { electricityPrice, waterPrice, rent, wifi, trash } = req.body;
      const createBrem = await brem.create({
        electricityPrice,
        waterPrice,
        rent,
        wifi,
        trash,
      });
      return res.json({ createBrem });
    } catch (error) {
      return next(new ErrorHander(error, 400));
    }
  };
  getBream = async (req, res) => {
    try {
      const brems = await brem.find()
      return res.json(brems)
    } catch (error) {
      return next(new ErrorHander(error, 400));
    }
  }
  getOneBream = async (req, res) => {
    try {
      const {id} = req.params
      const bremOne = await brem.findById(id)
      return res.json(bremOne)
    } catch (error) {
      return next(new ErrorHander(error, 400));
    }
  }
  updateBrem = async (req, res) => {
    try {
      const {id} = req.params
      const bremUpdate = await brem.findByIdAndUpdate(id,req.body)
      return res.json(bremUpdate)
    } catch (error) {
      return next(new ErrorHander(error, 400));
    }
  }
}
module.exports = new BremController();
