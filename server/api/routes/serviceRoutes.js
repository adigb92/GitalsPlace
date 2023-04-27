import express from 'express';
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from '../controllers/serviceController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getServices).post(protect, isAdmin, createService);
router
    .route('/:id')
    .get(getServiceById)
    .put(protect, isAdmin, updateService)
    .delete(protect, isAdmin, deleteService);

export default router;
