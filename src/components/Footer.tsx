import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface FooterProps { }

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="bg-dark py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; 2023 My Company</p>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-inline text-md-end text-light">
                            <li className="list-inline-item">
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/content" className="nav-link">
                                    Content
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/favorites" className="nav-link">
                                    Favorites
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/admin" className="nav-link">
                                    Admin
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/contact" className="nav-link">
                                    Contact Us
                                </Link>
                            </li>
                            <li className="list-inline-item text-center align-items-center">
                                Developed by Adi Gabay
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
