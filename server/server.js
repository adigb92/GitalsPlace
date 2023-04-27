/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import path from 'path';

// Import routes
import serviceRoutes from './api/routes/serviceRoutes.js';
import appointmentRoutes from './api/routes/appointmentRoutes.js';
import authRoutes from './api/routes/auth.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
