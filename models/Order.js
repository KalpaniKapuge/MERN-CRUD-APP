import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
    total_price: { 
      type: Number, 
      required: true 
    }
  },
  { timestamps: true } // ✅ this adds createdAt & updatedAt automatically
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
