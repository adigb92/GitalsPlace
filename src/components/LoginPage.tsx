import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, setRole } from "../utils/auth";
import { login } from "../utils/api";

interface LoginPageProps { }

const LoginPage: FunctionComponent<LoginPageProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await login({ email, password });
            if (response && response.token) {
                setToken(response.token);
                setRole(response.role);
                navigate("/home");
            } else {
                setError("Login failed, please try again.");
            }
        } catch (err) {
            setError("Login failed, please try again.");
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Login</h1>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mt-4">
                    {error && (
                        <div className="alert alert-danger text-center">{error}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
