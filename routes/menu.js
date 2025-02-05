const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;

   
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and Price are required' });
    }

    const newMenuItem = new MenuItem({ name, description, price });
    await newMenuItem.save();

    res.status(201).json({ message: 'Menu item created successfully', newMenuItem });
  } catch (err) {
    res.status(500).json({ message: 'Error creating menu item', error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items', error: err.message });
  }
});

module.exports = router;
