const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  selling: {
    type: Number,
  },
  rating: {
    type: Number,
  }
});

module.exports = mongoose.model("Product", ProductSchema);