import axios, { AxiosResponse } from "axios";
import { Service } from "../models/Service";


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const fetchServices = () => {
    return api.get('/services');
};

export const fetchServiceById = (id: string) => {
    return api.get(`/services/${id}`);
};

export const createService = (data: any) => {
    return api.post('/services', data);
};

export const updateService = (id: string, data: any) => {
    return api.put(`/services/${id}`, data);
};

export const deleteService = (id: string) => {
    return api.delete(`/services/${id}`);
};

export const login = (data: any) => {
    return api.post('/auth/login', data).then((response) => ({
        token: response.data.token,
        role: response.data.role,
    }));
};


export const register = (data: any) => {
    return api.post('/auth/register', data);
};

export const fetchAppointments = (userId: string) => {
    return api.get(`/appointments/user/${userId}`);
};

export const createAppointment = (data: any) => {
    return api.post('/appointments', data);
};

export const deleteAppointment = (id: string) => {
    return api.delete(`/appointments/${id}`);
};

export const updateAppointment = (id: string, data: any) => {
    return api.put(`/appointments/${id}`, data);
};

export const fetchFavorites = async (): Promise<Service[]> => {
    try {
        const response: AxiosResponse<Service[]> = await axios.get("/api/services/favorites");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch favorites: " + error);
    }
};
