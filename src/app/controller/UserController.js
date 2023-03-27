const user = require("../models/user");

class UserController {
  createUser = async (req, res, next) => {
    try {
      const { electricityPrice, waterPrice, rent, wifi, trash } = req.body;
      const createUser = await user.create({
        electricityPrice,
        waterPrice,
        rent,
        wifi,
        trash,
      });
      return res.json({ createUser });
    } catch (error) {
      return next(new ErrorHander(e, 400));
    }
  };
}
module.exports = new UserController();
