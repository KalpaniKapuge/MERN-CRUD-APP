import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Item from "../models/Item.js";
import Customer from "../models/Customer.js";

export const createOrder = async (req, res) => {
  const { id, customer_id, items } = req.body;
  try {
    if (!id || !id.trim()) {
      return res.status(400).json({ msg: 'Order ID is required and cannot be empty' });
    }
    const existingOrder = await Order.findOne({ id: id.trim() });
    if (existingOrder) {
      return res.status(400).json({ msg: 'Order ID already exists' });
    }
    if (!customer_id || !customer_id.trim()) {
      return res.status(400).json({ msg: 'Customer ID is required and cannot be empty' });
    }
    const customer = await Customer.findOne({ id: customer_id.trim() });
    if (!customer) {
      return res.status(400).json({ msg: `Customer with ID ${customer_id} not found` });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: 'At least one item is required' });
    }
    let total_price = 0;

    // Validate items and update stock
    for (const { item_id, quantity } of items) {
      if (!item_id || !quantity || parseInt(quantity) <= 0) {
        return res.status(400).json({ msg: 'Invalid item or quantity' });
      }
      const item = await Item.findOne({ id: item_id });
      if (!item || item.quantity < parseInt(quantity)) {
        return res.status(400).json({ msg: `Invalid item or insufficient quantity for item ID ${item_id}` });
      }
      total_price += item.price * parseInt(quantity);
      item.quantity -= parseInt(quantity);
      await item.save();
    }

    // Create order
    const order = new Order({
      id: id.trim(),
      customer_id: customer_id.trim(),
      total_price,
    });
    const savedOrder = await order.save();
    console.log('Saved order at 11:33 AM +0530, 2025-08-21:', savedOrder); // Debug saved data

    // Save order items
    const orderItemsToSave = items.map(({ item_id, quantity }) => ({
      order_id: order.id,
      item_id,
      quantity: parseInt(quantity),
    }));
    await OrderItem.insertMany(orderItemsToSave);

    res.json(savedOrder);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    const detailedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItem.find({ order_id: order.id });

        const itemDetails = await Promise.all(
          orderItems.map(async (oi) => {
            const item = await Item.findOne({ id: oi.item_id });
            return { 
              id: oi.item_id,
              name: item ? item.name : "Unknown Item", 
              quantity: oi.quantity 
            };
          })
        );

        const customer = await Customer.findOne({ id: order.customer_id });

        return { 
          id: order.id,
          customer_id: order.customer_id,
          customer_name: customer ? customer.name : "Unknown Customer",
          total_price: order.total_price,
          items: itemDetails,
          createdAt: order.createdAt,  // ✅ will exist now
          updatedAt: order.updatedAt   // ✅ will exist now
        };
      })
    );

    res.json(detailedOrders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
