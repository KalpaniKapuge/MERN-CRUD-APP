import shortid from 'shortid';
import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const item = new Item({
      id: shortid.generate(),
      name,
      price,
      quantity,
    });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!item) 
        return res.status(404).json({
             msg: 'Not found' 
        });
    res.json(item);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ id: req.params.id });
    if (!item) 
        return res.status(404).json({ 
            msg: 'Not found' 
        });
    res.json({ 
        msg: 'Deleted' 
    });
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};
