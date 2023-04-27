import { FunctionComponent, useState, useEffect } from "react";
import { Service } from "../models/Service";
import ContentForm from "./ContentForm";
import { createService, fetchServices } from "../utils/api";

interface AdminDashboardProps { }

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await fetchServices();
                const data: Service[] = response.data;
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServicesData();
    }, []);

    const handleAddService = async (service: Partial<Service>) => {
        try {
            const response = await createService(service);
            const newService: Service = response.data;
            setServices((prevServices) => [...prevServices, newService]);
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    return (
        <>
            <h1>Admin Dashboard</h1>
            <ContentForm onSubmit={handleAddService} />
            <h2>Service List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.price}</td>
                            <td>
                                <img
                                    src={service.imageUrl}
                                    alt={service.name}
                                    width="100"
                                    height="100"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AdminDashboard;
