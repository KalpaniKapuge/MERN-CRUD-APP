import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Item from "../models/Item.js";
import Customer from "../models/Customer.js";

export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find();

    const orderHistory = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItem.find({ order_id: order.id });
        const itemDetails = await Promise.all(
          orderItems.map(async (oi) => {
            const item = await Item.findOne({ id: oi.item_id });
            return {
              item_name: item ? item.name : "Unknown Item",
              quantity: oi.quantity,
            };
          })
        );
        const customer = await Customer.findOne({ id: order.customer_id });

        return {
          order_id: order.id,
          customer_name: customer ? customer.name : "Unknown Customer",
          items: itemDetails,
          total_price: order.total_price,
          order_date: order.createdAt,
        };
      })
    );

    console.log('Order history data at 12:24 PM +0530, 2025-08-21:', orderHistory);
    res.json(orderHistory);
  } catch (err) {
    console.error('Error fetching order history at 12:24 PM +0530, 2025-08-21:', err.message);
    res.status(500).json({ msg: err.message });
  }
};