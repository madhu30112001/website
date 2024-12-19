import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
          },
        items: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            }
        ],
        amount: { type: Number, required: true, min: 0 },
        address: { type: addressSchema, required: true },
        status: { type: String, default: "Food Processing" },
        payment: { type: Boolean, default: false },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
