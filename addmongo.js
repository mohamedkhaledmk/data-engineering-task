const fs = require("fs");
const brands = fs.readFileSync("brands.json");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://khaled25256:mk1234@brands.o2hljro.mongodb.net/"
);

const Brand = require("./models/brands-schema");

Brand.insertMany(JSON.parse(brands));

// here i want to add the brands to my mongo db collection
