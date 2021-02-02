const find = require("../Models/findByGetRequest");

class GetDauControllers {
  async GetDau(req, res, next) {
    try {
      // console.log("req.body ==>> ", req.body);
      let from = new Date(req.body.from).setUTCHours(0, 0, 0, 0);
      let to = new Date(req.body.to);
      to.setDate(to.getDate() + 1);
      to = new Date(to).setUTCHours(0, 0, 0, 0);
      from = new Date(from);
      to = new Date(to);
      // console.log("----", from, to);
      // console.log("---- ok ", req.body.from, req.body.to);

      const data = await find(
        "dau",
        {
          timestamp: {
            $gte: from,
            $lt: to,
          },
        },
        {},
        { timestamp: 1 }
      );
      if (!data.MongoError) {
        // console.log("data", data);
        // console.log("\ndataLength", data.length);
        return res.send(data);
      } else {
        // console.log(data.MongoError);
      }
    } catch (error) {
      // console.log(error.message);
      return res.send(error.message);
    }
  }
}

module.exports = new GetDauControllers();
