import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchServices = async () => {
    try {
        const response = await axios.get("/api/services");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching services");
    }
};

export async function checkAppointmentAvailability(
    serviceId: string,
    date: string,
    time: string,
    token: string
): Promise<{ available: boolean }> {
    const response = await axios.get(
        `${API_BASE_URL}/appointments/check?serviceId=${serviceId}&date=${date}&time=${time}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (response.status !== 200) {
        throw new Error("Error checking appointment availability");
    }

    return await response.data;
}




export const createAppointment = async (
    appointmentData: any,
    token: string
) => {
    try {
        const response = await axios.post("/api/appointments", appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error creating appointment");
    }
};
