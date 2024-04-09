const fs = require("fs");

async function transformBrands() {
  try {
    const jsonData = fs.readFileSync("brands.json", "utf8");
    const brands = JSON.parse(jsonData);

    const transformedBrands = [];

    for (const brand of brands) {
      brand.yearFounded = brand.yearFounded || brand.yearCreated;
      if (!brand.yearFounded || isNaN(brand.yearFounded)) {
        brand.yearFounded = parseInt(brand.yearCreated || 1600);
      }

      brand.numberOfLocations = brand.numberOfLocations || 1;

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
      transformedBrands.push(brand);
    }

    const modifiedData = JSON.stringify(transformedBrands, null, 2);
    fs.writeFileSync("brands-modified.json", modifiedData);

    console.log("Brands transformed and saved successfully!");
  } catch (err) {
    console.error("Error transforming brands:", err);
  }
}

transformBrands();
