import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
    // Hook for navigation
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // State for error and success messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if both fields are filled
        if (formData.email && formData.password) {
            try {
                const response = await axios.post('https://assignment-game-hgzr.onrender.com/players/login', formData); 
                
                // Set success message and reset form
                setSuccessMessage('Login successful!'); 
                setErrorMessage('');
                setFormData({ email: '', password: '' });
                navigate('/home');
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Error logging in.');
                setSuccessMessage('');
            }
        } else {
            // Alert user to fill in all fields if any are empty
            setErrorMessage('Please fill in all fields.');
        }
    };

    return (
        <div className="login-container">
            <div className="left-side">
                <h1>Welcome Back!</h1>
                <p>"Log in to continue managing your fantasy team."</p>
            </div>
            <div className="right-side">
                <h2>Log In</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" id="log-in">Log In</button>
                    {/* Display error and success messages */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>} 
                    <div className="signup-link">
                        <p>Don't have an account? <a href="/signup">Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
