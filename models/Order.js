import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        id: { 
            type: String, 
            required: true, 
            unique: true
        },
        customer_id: { 
            type: String, 
            required: true
        }, 
        date: { 
            type: Date, 
            default: Date.now 
        },
        total_price: { 
            type: Number, 
            required: true 
        },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;