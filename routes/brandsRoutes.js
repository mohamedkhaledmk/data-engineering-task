const express = require("express");
const brandsController = require("../controllers/brandsController");

const router = express.Router();

router
  .route("/")
  .get(brandsController.getBrands)
  .post(brandsController.postBrands);

module.exports = router;
