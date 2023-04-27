import express from 'express';
import {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    checkAppointmentAvailability,
} from '../controllers/appointmentController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAppointments).post(protect, createAppointment);
router.route('/check').get(protect, checkAppointmentAvailability);
router
    .route('/:id')
    .get(protect, getAppointmentById)
    .put(protect, updateAppointment)
    .delete(protect, isAdmin, deleteAppointment);

export default router;
