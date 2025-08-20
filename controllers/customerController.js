import shortid from 'shortid';
import Customer from '../models/Customer.js';

export const createCustomer = async (req, res) => {
  const { name, nic, contactNo, address } = req.body;
  try {
    const customer = new Customer({
      id: shortid.generate(),
      name,
      nic,
      contactNo,
      address,
    });
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ msg: 'Not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ id: req.params.id });
    if (!customer) 
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
