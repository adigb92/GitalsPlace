import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        date: { type: Date, required: true, get: v => new Date(v.setHours(0, 0, 0, 0)) },
        time: { type: String, required: true },
        status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] },
    },
    {
        timestamps: true,
    }
);

appointmentSchema.set('toJSON', { getters: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
