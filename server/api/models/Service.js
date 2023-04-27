import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        duration: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;