const mongoose = require("mongoose");

const find = (name, query, hint = {}, sort = {}, limit = 0) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(name, (err, res) => {
      if (err) reject(err);
      resolve(
        res
          .find({ $query: query, $hint: { ...hint } })
          .sort(sort)
          .limit(limit)
          .toArray()
      );
    });
  });
};

module.exports = find;
