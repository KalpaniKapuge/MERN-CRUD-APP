import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema(
    {
        order_id: { 
            type: String, 
            required: true 
        },
        item_id: { 
            type: String, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;