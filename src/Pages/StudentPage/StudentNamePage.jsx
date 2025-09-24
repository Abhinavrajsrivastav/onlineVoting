import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <div className="poll-tag">
                + Interactive Poll
            </div>

            <h1 className="main-heading">Let's Get Started</h1>
            <p className="sub-heading">
                If you're a student, you'll be able to <strong>submit your answers</strong>, participate in live polls, and see how your responses compare with your classmates.
            </p>

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
                    className="name-input" 
                />
            </div>
            
            <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default StudentNamePage;