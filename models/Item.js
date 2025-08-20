import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        id: { 
            type: String, 
            required: true, 
            unique: true
        },
        code: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
});

const Item= mongoose.model('Item', itemSchema);
export default Item;