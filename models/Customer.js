import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
    {
        id: { 
            type: String, 
            required: true, 
            unique: true 
        }, 
        name: { 
            type: String, 
            required: true 
        },
        nic: { 
            type: String 
        },
        contactNo: { 
            type: String 
        },
        address: { 
            type: String, 
            required: true 
        },
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;