import Appointment from '../models/Appointment.js';
import asyncHandler from 'express-async-handler';

const appointmentExists = async (serviceId, dateWithTime) => {
    const startTime = new Date(dateWithTime);
    const endTime = new Date(dateWithTime);
    endTime.setMinutes(endTime.getMinutes() + 1);

    const existingAppointment = await Appointment.findOne({
        service: serviceId,
        date: {
            $gte: startTime,
            $lt: endTime,
        },
    });

    return existingAppointment;
};


const checkAppointmentAvailability = asyncHandler(async (req, res) => {
    const { service, date, time } = req.query;

    // Create a date object with the time incorporated
    const dateWithTime = new Date(date);
    const timeParts = time.split(':');
    dateWithTime.setHours(timeParts[0], timeParts[1]);

    const existingAppointment = await appointmentExists(service, dateWithTime);

    if (existingAppointment) {
        res.status(200).json({ available: false });
    } else {
        res.status(200).json({ available: true });
    }
});

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAppointment = asyncHandler(async (req, res) => {
    const { service, date, time, notes } = req.body;

    // Create a date object with the time incorporated
    const dateWithTime = new Date(date);
    const timeParts = time.split(':');
    dateWithTime.setHours(timeParts[0], timeParts[1]);

    // Check if the appointment already exists
    const existingAppointment = await appointmentExists(service, dateWithTime);

    if (existingAppointment) {
        res.status(400);
        throw new Error("An appointment already exists at the specified date and time.");
    }

    // Create a new appointment
    const appointment = new Appointment({
        user: req.user._id,
        service,
        date: dateWithTime,
        time,
        notes,
    });

    // Save the appointment and return the result
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
});

const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedAppointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.json(updatedAppointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            await appointment.remove();
            res.json({ message: 'Appointment removed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    checkAppointmentAvailability,
    appointmentExists,
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};