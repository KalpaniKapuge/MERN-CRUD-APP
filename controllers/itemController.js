import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  const { id, name, price, quantity } = req.body;
  try {
    if (!id || !id.trim()) {
      return res.status(400).json({ msg: 'ID is required and cannot be empty' });
    }
    const existing = await Item.findOne({ id: id.trim() });
    if (existing) {
      return res.status(400).json({ msg: 'ID already exists' });
    }
    if (!name || !price || !quantity) {
      return res.status(400).json({ msg: 'Name, price, and quantity are required' });
    }
    if (parseFloat(price) <= 0 || parseInt(quantity) <= 0) {
      return res.status(400).json({ msg: 'Price and quantity must be positive' });
    }
    const item = new Item({
      id: id.trim(),
      name: name.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity),
    });
    const savedItem = await item.save();
    console.log('Saved item at 11:33 AM +0530, 2025-08-21:', savedItem); // Debug saved data
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ msg: 'Name, price, and quantity are required' });
    }
    if (parseFloat(price) <= 0 || parseInt(quantity) <= 0) {
      return res.status(400).json({ msg: 'Price and quantity must be positive' });
    }
    const item = await Item.findOneAndUpdate(
      { id: req.params.id },
      { name: name.trim(), price: parseFloat(price), quantity: parseInt(quantity) },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ msg: 'Not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ msg: 'Not found' });
    }
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};