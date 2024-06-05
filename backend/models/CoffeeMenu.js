const mongoose = require('mongoose');

const coffeeMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Add a field to store image data
  image: { data: Buffer, contentType: String }
});

const CoffeeMenu = mongoose.model('CoffeeMenu', coffeeMenuSchema);

module.exports = CoffeeMenu;
