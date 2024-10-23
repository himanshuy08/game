import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/Signup.css'; 

const Signup = () => {
    // State to hold the form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        position: '',
        nationality: ''
    });

    // State for error and success messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle changes to the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); 
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, position } = formData;
    
        // Check if required fields are filled
        if (name && email && password && position) {
            try {
                const response = await axios.post('https://assignment-game-hgzr.onrender.com/players/signup', formData);
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                setFormData({ name: '', email: '', password: '', position: '', nationality: '' });
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Error signing up.');
                setSuccessMessage('');
            }
        } else {
            // Alert user to fill in all required fields if any are empty
            setErrorMessage('Please fill in all required fields.');
        }
    };
    
    return (
        <div className="signup-container">
            <div className="left-side">
                <h1>Create Your Fantasy Team</h1>
                <p>"Join now and create your fantasy team. Compete with others and win exciting prizes."</p>
            </div>
            <div className="right-side">
                <h2>Sign Up</h2>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Player Position"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            placeholder="Player Nationality"
                        />
                    </div>
                    <button type="submit" id="sign-up">Sign Up</button>
                    {/* Display error and success messages */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <div className="signup-link">
                        <p>Already have an account? <a href="/">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
