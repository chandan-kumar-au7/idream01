const find = require("../Models/findByGetRequest");

class GetDauControllers {
  async GetDau(req, res, next) {
    try {
      // console.log("req.body ==>> ", req.body);

      const data = await find("dau", {});
      console.log("data", data);
      console.log("\ndataLength", data.length);
      return res.send(data);
    } catch (error) {
      // console.log(error.message);
      return res.send(error.message);
    }
  }
}

module.exports = new GetDauControllers();
