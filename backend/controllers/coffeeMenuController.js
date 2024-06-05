const Menu = require('../models/Menu');

// Controller function to add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    // Extract form data from request body
    const { category, name, price } = req.body;
    
    // Create a new Menu instance
    const menu = new Menu({
      category,
      name,
      price,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    // Save the menu item to the database
    await menu.save();

    // Send success response
    res.status(201).json({ message: 'Menu item added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding menu item:', error);
    res.status(500).json({ message: 'Error adding menu item' });
  }
};

// Controller function to get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    // Fetch all menu items from the database
    const menuItems = await Menu.find();
    // Send the menu items as JSON response
    res.json(menuItems);
  } catch (error) {
    // Handle errors
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Error fetching menu items' });
  }
};

// Other controller functions for updating, deleting, etc. can be added here as needed
