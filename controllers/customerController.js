import Customer from '../models/Customer.js';

export const createCustomer = async (req, res) => {
  const { id, name, nic, contactNo, address } = req.body;
  try {
    if (!id || !id.trim()) {
      return res.status(400).json({ msg: 'ID is required and cannot be empty' });
    }
    const existing = await Customer.findOne({ id: id.trim() });
    if (existing) {
      return res.status(400).json({ msg: 'ID already exists' });
    }
    if (!name || !address) {
      return res.status(400).json({ msg: 'Name and address are required' });
    }
    const customer = new Customer({
      id: id.trim(),
      name: name.trim(),
      nic: nic ? nic.trim() : null,
      contactNo: contactNo ? contactNo.trim() : null,
      address: address.trim(),
    });
    const savedCustomer = await customer.save();
    console.log('Saved customer at 11:33 AM +0530, 2025-08-21:', savedCustomer); // Debug saved data
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { name, nic, contactNo, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ msg: 'Name and address are required' });
    }
    const customer = await Customer.findOneAndUpdate(
      { id: req.params.id },
      {
        name: name.trim(),
        nic: nic ? nic.trim() : null,
        contactNo: contactNo ? contactNo.trim() : null,
        address: address.trim(),
      },
      { new: true }
    );
    if (!customer) return res.status(404).json({ msg: 'Not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ id: req.params.id });
    if (!customer) 
        return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};