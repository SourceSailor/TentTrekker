const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  name: String,
  image: String,
  description: String,
  location: String,
  price: Number,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
