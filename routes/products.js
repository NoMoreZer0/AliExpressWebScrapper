const router = require("express").Router();
const Product = require("../models/Product");
const scrapeProduct = require("../scrapper");

router.get("/", async(req, res) => {
  const users = await Product.find();
  res.status(201).json(users);
})

router.post("/", async(req, res) => {
  const name = req.body.name;
  const page = req.body.page;
  let products = await scrapeProduct(name, page);
  if (products.length == 0) {
    res.status(403).json("no products were found");
  }
  try {
    for (let i = 0; i < products.length; ++i) {
      const newProduct = new Product({name: products[i][0], price: products[i][1], selling: products[i][2], rating: products[i][3]});
      await newProduct.save();
    }
    res.status(201).json("products saved successfully!");
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete("/", async(req, res) => {
  try {
    await Product.deleteMany({})
    res.status(201).json("all products successfully deleted!");
  } catch(err) {
    res.status(500).json(err);
  }

})

module.exports = router;