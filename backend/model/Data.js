const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Data = new Schema(
  {
    sensor_name: {
      type: String,
    },
    sensor_data: {
      type: Number,
    },
    dob: {
      type: Date,
    },
  },
  {
    collection: "_eqz34fr54",
  }
);

module.exports = mongoose.model("Data", Data);
