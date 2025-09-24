import React from 'react';
import './WatingPage.css';

const WaitingPage = () => {
   return (
        <div className="waiting-container">
            <div className="poll-tag">
                + Interactive Poll
            </div>

            <div className="spinner"></div>

            <h2 className="waiting-text">
                Wait for the teacher to ask questions..
            </h2>

            <button className="chat-icon-btn" aria-label="Open Chat">
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M21 11.5C21 16.7467 16.7467 21 11.5 21C11.1922 21 10.8878 20.9846 10.5882 20.9544C10.5315 20.9483 10.4731 20.9576 10.4228 20.9812L5.42283 23.4812C5.16113 23.6119 4.83887 23.4381 4.79632 23.1492L4.29632 19.6492C4.27622 19.5085 4.20126 19.3804 4.08821 19.295C3.41912 18.7831 3 18.0673 3 17.2727V11.5C3 6.25329 7.25329 2 12.5 2C17.7467 2 21 5.25329 21 9.5" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default WaitingPage;