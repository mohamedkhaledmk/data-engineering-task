const Brand = require("../models/brands-schema");
const express = require("express");
exports.getBrands = async (req, res) => {
  const brands = await Brand.find();
  console.log(brands);
  res
    .status(200)
    .json({ message: "Hello, this is the get brands route", brands });
};

exports.postBrands = async (req, res) => {
  const brand = new Brand(req.body);
  console.log(brand);
  await brand.save();
  res
    .status(200)
    .json({ message: "Hello, this is the post brands route", brand });
};

exports.deleteBrands = async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  console.log(brand);
  res
    .status(200)
    .json({ message: "Hello, this is the delete brands route", brand });
};
