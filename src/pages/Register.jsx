import React, { useState } from 'react';
import { Footer, Navbar } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import {
    LinearProgress,
    Box,

  } from '@material-ui/core';
const Register = () => {
    // State to manage form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // New state for success message
    const navigate = useNavigate(); // React Router's navigate function
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, pwd: password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Registration successful
                console.log('Registration successful!');
                console.log("Registration response data:", data);

                // Show success message and change background color to greenish
                setSuccess(true);
                setError(null);

                // Wait for 2 seconds and then navigate to /login
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            } else {
                const errorData = await response.json();

                if (errorData.message === 'Email already exists') {
                    // Show "Email already exists" error
                    setError('Email already exists');
                    setSuccess(false); // Reset success state

                } else if (errorData.message === 'Password must contain at least one lowercase letter, one uppercase letter, and one number') {
                    // Show "Password complexity" error
                    setError('Password must contain at least one lowercase letter, one uppercase letter, and one number');
                    setSuccess(false); // Reset success state

                } else {
                    // Show general error message
                    setError('Registration failed. Please try again.');
                    setSuccess(false); // Reset success state

                }
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError('An error occurred. Please try again later.');
            setSuccess(false); // Reset success state
        }
        setIsLoading(false);

    };

    return (
        <>
            <Navbar />
            <div className={`container my-3 py-3`}>
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">Registration successful!</div>}
                            <div className="my-3">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-underline text-info">
                                        Login
                                    </Link>{' '}
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                            {isLoading && <Box style={{ marginTop: '10px' }}>
                                <LinearProgress />
                            </Box>}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
