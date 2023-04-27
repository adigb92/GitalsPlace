import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface BookingCreatedProps {
    appointmentDetails: {
        serviceName: string;
        appointmentDate: string;
        appointmentTime: string;
    };
}

const BookingCreated: FunctionComponent<BookingCreatedProps> = ({
    appointmentDetails,
}) => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/home");
    };

    return (<div>
        <h1>Booking Created</h1>
        <p>
            Your appointment for <strong>{appointmentDetails.serviceName}</strong>{" "}
            has been successfully booked on{" "}
            <strong>{appointmentDetails.appointmentDate}</strong> at{" "}
            <strong>{appointmentDetails.appointmentTime}</strong>.
        </p>
        <button onClick={handleGoBack}>Go back to the main page</button>
    </div>);
}

export default BookingCreated;