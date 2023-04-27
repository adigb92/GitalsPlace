import {
    FunctionComponent
} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { removeToken, removeRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface NavbarProps { }

const Navbar: FunctionComponent<NavbarProps> = () => {
    const { isLoggedIn, isAdmin, updateAuthStatus } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        removeRole();
        updateAuthStatus();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/home" className="navbar-brand">
                    My Website
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/content" className="nav-link">
                                Content
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favorites" className="nav-link">
                                Favorites
                            </Link>
                        </li>
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/book" className="nav-link">
                                        Book an appointment
                                    </Link>
                                </li>
                                {isAdmin && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/admin" className="nav-link">
                                                Admin
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/addserv" className="nav-link">
                                                Add service
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-link nav-link">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <style>{`
        .navbar.bg-dark {
          background-color: #4B0082;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
