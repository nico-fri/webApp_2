const express = require("express");
const app = express();
const dataRoute = express.Router();

// Data model
let Data = require("../model/Data");

// Get all data
dataRoute.route("/").get((req, res) => {
  Data.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = dataRoute;
