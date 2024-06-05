const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  items: [
    {
      category: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
