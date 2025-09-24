import React, { useState } from 'react';
import './LandingPage.css'; 
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [selectedRole, setSelectedRole] = useState('student');

    const handleContinue = () => {
        if (selectedRole === 'student') {
            window.location.href = '/student'; 
        } else {
            window.location.href = '/teacher'; 
        }
    };

    return (
        <div className="landing-container">
            <div className="poll-tag">
                <span className="plus-icon">+</span> Interactive Poll
            </div>

            <h1 className="main-heading">Welcome to the Live Polling System</h1>
            <p className="sub-heading">
                Please select the role that best describes you to begin using the live polling system
            </p>

            <div className="roles-wrapper">
                <div
                    className={`role-box ${selectedRole === 'student' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('student')}
                >
                    <h2 className="role-title">I'm a Student</h2>
                    <p className="role-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                <div
                    className={`role-box ${selectedRole === 'teacher' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('teacher')}
                >
                    <h2 className="role-title">I'm a Teacher</h2>
                    <p className="role-description">
                        Submit answers and view live poll results in real-time.
                    </p>
                </div>
            </div>

            <button className="continue-button" onClick={handleContinue}>
                Continue
            </button>
        </div>
    );
};

export default LandingPage;