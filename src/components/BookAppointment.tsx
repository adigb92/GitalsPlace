import React, { FunctionComponent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchServices, checkAppointmentAvailability, createAppointment } from "../utils/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BookAppointmentProps { }

interface Service {
    _id: string;
    name: string;
}

const BookAppointment: FunctionComponent<BookAppointmentProps> = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("09:00");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const [availabilityChecked, setAvailabilityChecked] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
                setSelectedService(data[0]);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServicesData();
    }, []);

    // console.log("availabilityChecked:", availabilityChecked, "isAvailable:", isAvailable);


    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setAvailabilityChecked(false);
        }
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
        setAvailabilityChecked(false);
    };

    const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const serviceId = event.target.value;
        const service = services.find((service) => service._id === serviceId);
        setSelectedService(service ?? null);
        setAvailabilityChecked(false);
    };

    const checkAppointmentAvailabilityWrapper = async () => {
        if (selectedService && !availabilityChecked) {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("No token found. Please log in.");
                    return;
                }
                const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;

                const responseData = await checkAppointmentAvailability(
                    selectedService._id,
                    formattedDate,
                    selectedTime,
                    token
                );
                setIsAvailable(responseData.available);
                setAvailabilityChecked(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (selectedService && !availabilityChecked) {
            checkAppointmentAvailabilityWrapper();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate, selectedTime, selectedService, availabilityChecked]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to book an appointment.");
            navigate("/login");
            return;
        }

        if (!selectedService) {
            toast.error("No service selected.");
            return;
        }

        const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        const available = await checkAppointmentAvailability(selectedService._id, formattedDate, selectedTime, token);

        if (!available) {
            toast.error("The selected appointment time is already booked. Please choose a different time.");
            return;
        }

        const appointmentData = {
            date: selectedDate,
            time: selectedTime,
            service: selectedService._id,
        };

        try {
            const data = await createAppointment(appointmentData, token);
            if (data) {
                navigate("/success");
                toast.success("Appointment booked successfully");
            } else {
                toast.error("Failed to book appointment");
            }
        } catch (error) {
            toast.error("Error booking appointment");
        }
        return;
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            <div>
                <label htmlFor="date-picker">Select a date: </label>
                <DatePicker
                    id="date-picker"
                    selected={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div>
                <label htmlFor="time">Select a time: </label>
                <select id="time" value={selectedTime} onChange={handleTimeChange}>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                </select>
            </div>
            <div>
                <label htmlFor="service">Select a service: </label>
                <select
                    id="service"
                    value={selectedService?._id}
                    onChange={handleServiceChange}
                >
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleSubmit}
                disabled={!availabilityChecked || !isAvailable}
            >
                Book Appointment
            </button>
            <ToastContainer />
        </div>
    );
};

export default BookAppointment;

