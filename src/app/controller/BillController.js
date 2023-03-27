const bill = require("../models/bill");

class BillController {
  createBill = async (req, res, next) => {
    try {
      const { electricityPrice, waterPrice, rent, wifi, trash } = req.body;
      const createBill = await bill.create({
        electricityPrice,
        waterPrice,
        rent,
        wifi,
        trash,
      });
      return res.json({ createBill });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
}
module.exports = new BillController();
