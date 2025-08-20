import shortid from 'shortid';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Item from '../models/Item.js';
import Customer from '../models/Customer.js';

exports.createOrder = async (req, res) => {
  const { customer_id, items } = req.body; 
  try {
    let total_price = 0;
    for (const { item_id, quantity } of items) {
      const item = await Item.findOne({ id: item_id });
      if (!item || item.quantity < quantity) 
        return res.status(400).json({ 
            msg: 'Invalid item or quantity'
     });
      total_price += item.price * quantity;

      // Update item quantity
      item.quantity -= quantity;
      await item.save();
    }

    const order = new Order({
      id: shortid.generate(),
      customer_id,
      total_price,
    });
    await order.save();

    for (const { item_id, quantity } of items) {
      const orderItem = new OrderItem({
        order_id: order.id,
        item_id,
        quantity,
      });
      await orderItem.save();
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({
         msg: err.message 
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const detailedOrders = await Promise.all(orders.map(async (order) => {
      const orderItems = await OrderItem.find({ order_id: order.id });

      const itemDetails = await Promise.all(orderItems.map(async (oi) => {
        const item = await Item.findOne({ id: oi.item_id });
        return { 
            name: item.code, 
            quantity: oi.quantity 
        };
      }));
      const customer = await Customer.findOne({ id: order.customer_id });
      return { ...order.toObject(), customer_name: customer.name, items: itemDetails };
    }));
    res.json(detailedOrders);
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};