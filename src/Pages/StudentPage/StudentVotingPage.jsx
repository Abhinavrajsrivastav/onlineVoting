import React, { useState, useEffect } from 'react';
import './StudentVotingPage.css'; // The CSS for styling

const StudentVotingPage = () => {
    // State to track which option is clicked before submitting
    const [selectedOptionId, setSelectedOptionId] = useState(1); // Default to 'Mars' being selected as in the image
    // State for the countdown timer
    const [timeLeft, setTimeLeft] = useState(15);

    // Dummy poll data to match the image
    const poll = {
        question: "Which planet is known as the Red Planet?",
        options: [
            { id: 1, text: "Mars" },
            { id: 2, text: "Venus" },
            { id: 3, text: "Jupiter" },
            { id: 4, text: "Saturn" },
        ]
    };

    // Effect to handle the countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = () => {
        if (selectedOptionId !== null) {
            alert(`Submitting answer: ${poll.options.find(opt => opt.id === selectedOptionId).text}`);
            // In a real app, you would emit this to a server
        } else {
            alert("Please select an answer.");
        }
    };

    return (
        <div className="sv-container">
            <div className="sv-header">
                <h2>Question 1</h2>
                <div className="sv-timer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                </div>
            </div>

            <div className="sv-poll-box">
                <div className="sv-question-header">
                    <p>{poll.question}</p>
                </div>

                <div className="sv-options-body">
                    {poll.options.map((option, index) => (
                        <button
                            key={option.id}
                            className={`sv-option-btn ${selectedOptionId === option.id ? 'selected' : ''}`}
                            onClick={() => setSelectedOptionId(option.id)}
                        >
                            <span className="option-index">{option.id}</span>
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sv-submit-wrapper">
                <button className="sv-submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

            <button className="chat-icon-btn" aria-label="Open Chat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        </div>
    );
};

export default StudentVotingPage;