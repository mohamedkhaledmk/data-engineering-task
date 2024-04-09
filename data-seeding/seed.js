const faker = require("faker");
const mongoose = require("mongoose");
const Brand = require("../models/brands-schema");

mongoose.connect(
  "mongodb+srv://khaled25256:mk1234@brands.o2hljro.mongodb.net/"
);

const db = mongoose.connection;

db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Clear existing data
    await Brand.deleteMany({});

    // Generate and insert dummy data
    const brands = [];
    const numberOfBrands = 10; // Adjust the number of brands you want to generate

    for (let i = 0; i < numberOfBrands; i++) {
      const brand = new Brand({
        brandName: faker.company.companyName(),
        yearFounded: faker.datatype.number({
          min: 1600,
          max: new Date().getFullYear(),
        }),
        headquarters: faker.address.city(),
        numberOfLocations: faker.datatype.number({ min: 1, max: 100 }),
      });
      brands.push(brand);
    }

    await Brand.insertMany(brands);
    console.log("Dummy data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the connection
    db.close();
  }
});
