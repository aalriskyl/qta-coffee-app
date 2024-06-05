const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { alias, items } = req.body;

    if (!alias || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Alias and items are required and items must be a non-empty array' });
    }

    for (let item of items) {
      if (!item.category || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ message: 'Each item must include category, name, price, and quantity' });
      }
    }

    const newOrder = new Order({ alias, items });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }

};
exports.getOrders = async (req, res) => {
  try {
    // Fetch orders from the database
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
