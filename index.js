const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const brandsRouter = require("./routes/brandsRoutes");
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/brands", brandsRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB 💚💚"))
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
