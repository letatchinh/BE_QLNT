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
      return next(new ErrorHander(e, 400));
    }
  };
}
module.exports = new BremController();
