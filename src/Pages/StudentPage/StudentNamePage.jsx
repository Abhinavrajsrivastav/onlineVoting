import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Make sure this CSS import path is correct for your project structure
import './StudentNamePage.css'; 

const StudentNamePage = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleContinue = () => {
        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }
        navigate('/voting');
    };

    return (
        <div className="student-page-container">
            {/* 1. Added the missing poll tag */}
            <div className="poll-tag">
                + Interactive Poll
            </div>

            {/* 2. Updated the heading and subheading text */}
            <h1 className="main-heading">Let's Get Started</h1>
            <p className="sub-heading">
                If you're a student, you'll be able to <strong>submit your answers</strong>, participate in live polls, and see how your responses compare with your classmates.
            </p>

            {/* 3. Added the proper structure for the labeled input */}
            <div className="input-wrapper">
                <label htmlFor="nameInput" className="input-label">
                    Enter your Name
                </label>
                <input
                    id="nameInput"
                    type="text"
                    placeholder="e.g., Rahul Bajaj"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // 4. Corrected the className to match the CSS
                    className="name-input" 
                />
            </div>
            
            {/* 5. Updated the button text */}
            <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default StudentNamePage;