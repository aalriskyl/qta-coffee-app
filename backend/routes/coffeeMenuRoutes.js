const express = require('express');
const router = express.Router();
const multer = require('multer');
const Menu = require('../models/Menu'); // Adjust the import to your Menu model

// Multer configuration for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add new menu items along with image upload
router.post('/', upload.single('image'), async (req, res) => {
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
});


module.exports = router;
