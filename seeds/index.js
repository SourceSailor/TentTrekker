const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptions, places } = require("./seedInfo");
const Campground = require("../models/campgrounds");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 100);
    const camp = new Campground({
      name: `${sample(descriptions)} ${sample(places)}`,
      image:
        "https://media.istockphoto.com/id/1213691432/photo/tourists-sitting-near-campfire-under-starry-sky.jpg?s=612x612&w=0&k=20&c=6B2GdQROSabFQKrerTaYHaplaCU2UwiOFokyUW6hEp0=",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate reiciendis nihil veniam tempore a doloribus, consectetur blanditiis quam nobis dicta molestiae? At qui harum consequatur! Sunt quo ipsum nihil provident!",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      price,
    });
    await camp.save();
  }
};
seedDB();
