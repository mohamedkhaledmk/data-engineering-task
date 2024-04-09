const mongoose = require("mongoose");
const Brand = require("../models/brands-schema"); // Assuming your brand model is in a separate file

const MONGO_URI =
  "mongodb+srv://khaled25256:mk1234@brands.o2hljro.mongodb.net/"; // Replace with your actual MongoDB connection string

async function transformBrands() {
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Error connecting to MongoDB:", err));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

  try {
    const brands = await Brand.find();

    for (const brand of brands) {
      // Prefer yearCreated over yearFounded if both exist
      brand.yearFounded = brand.yearFounded || brand.yearCreated;
      // Use yearCreated as fallback if yearFounded is missing or invalid
      if (!brand.yearFounded || isNaN(brand.yearFounded)) {
        brand.yearFounded = parseInt(brand.yearCreated || 1600); // Use minimum year if yearCreated is also missing
      }

      // Convert invalid numberOfLocations to a number or use minimum
      brand.numberOfLocations = parseInt(brand.numberOfLocations || 1);
      //   console.log("brandsssss", brand);

      if (!brand.headquarters) {
        brand.headquarters = brand.hqAddress || "Unknown";
      }
      console.log(brand.brandName);
      brand.brand ? console.log("first") : console.log("second");
      if (!brand.brandName) {
        if (brand.brand && typeof brand.brand === "object") {
          brand.brandName = brand.brand.name;
          delete brand.brand;
        } else if (typeof brand.brand === "string") {
          brand.brandName = brand.brand;
        } else {
          brand.brandName = "Unknown";
        }
      }
      console.log(brand);
      console.log(brand.hqAddress);
      if (brand.brand) {
        delete brand.brand;
      }
      if (brand.hqAddress) {
        delete brand.hqAddress;
      }
      // Validate the transformed data before saving
      await brand.validate();
      await brand.save();
    }

    console.log("Brands transformed successfully!");
  } catch (err) {
    console.error("Error transforming brands:", err);
  } finally {
    await mongoose.disconnect();
  }
}

transformBrands();
