import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home'; // Import Home component
import Login from './components/Login'; // Import Login component
import Signup from './components/Signup'; // Import Signup component
import './App.css';

function App() {
    return (
        <Router> 
            <div className="App">
                <Routes> 
                    <Route path="/home" element={<Home />} /> {/* Route for Home page */}
                    <Route path="/" element={<Login />} /> {/* Route for Login page */}
                    <Route path="/signup" element={<Signup />} /> {/* Route for Signup page */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
