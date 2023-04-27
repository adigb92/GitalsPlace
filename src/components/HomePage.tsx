import React, { FunctionComponent } from 'react';

interface HomePageProps { }

const HomePage: FunctionComponent<HomePageProps> = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">Welcome to Our Nail Care App!</h1>
            <p className="text-center">
                We offer a wide range of professional nail care services. Browse through our
                services and book your appointment today.
            </p>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3>Why Choose Us?</h3>
                    <ul>
                        <li>High-quality services</li>
                        <li>Experienced nail technicians</li>
                        <li>Relaxing and comfortable atmosphere</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <h3>Contact Us</h3>
                    <p>
                        Address: 123 Main St, Anytown, USA
                        <br />
                        Phone: (555) 123-4567
                        <br />
                        Email: info@nailcareapp.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
