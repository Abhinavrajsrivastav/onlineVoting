import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherLiveView.css';

const TeacherLiveView = ({ socket, poll, participants, messages }) => {
    const [panelOpen, setPanelOpen] = useState(false); // For showing/hiding participants/chat panel
    const [activeTab, setActiveTab] = useState('participants');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // --- Dummy Data ---
    const finalPoll = poll && poll.isActive ? poll : {
        question: "Which planet is known as the Red Planet?",
        options: [
            { id: 1, text: 'Mars', votes: 12 },
            { id: 2, text: 'Venus', votes: 2 },
            { id: 3, text: 'Jupiter', votes: 1 },
            { id: 4, text: 'Saturn', votes: 3 },
        ]
    };

    const finalParticipants = participants && participants.length > 0 ? participants : [
        "Rahul Arora", "Pushpender Rautela", "Rijul Zalpuri", "Nadeem N", "Ashwin Sharma"
    ];

    const finalMessages = messages && messages.length > 0 ? messages : [
        { id: 1, sender: "Teacher", text: "Welcome to the session!" },
        { id: 2, sender: "Rahul Arora", text: "Hello, teacher!" },
        { id: 3, sender: "Pushpender Rautela", text: "Good morning!" }
    ];

    // --- Event Handlers ---
    const handleKickStudent = (name) => {
        if (window.confirm(`Are you sure you want to kick ${name}?`)) {
            socket?.emit('kick-student', name);
        }
    };

    const handleNewQuestion = () => {
        navigate('/teacher'); 
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            socket?.emit('send-message', newMessage);
            setNewMessage('');
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [finalMessages]);

    const totalVotes = finalPoll.options.reduce((sum, option) => sum + option.votes, 0);

    return (
        <div className="tlv-wrapper">
            <div className="tlv-main-content">
                <div className="tlv-poll-view">
                    <h2 className="tlv-title">Question</h2>
                    <div className="tlv-poll-box">
                        <div className="tlv-question-header">{finalPoll.question}</div>
                        <div className="tlv-results-body">
                            {finalPoll.options.map((option, index) => {
                                const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
                                return (
                                    <div key={option.id} className="tlv-result-bar">
                                        <div className="tlv-progress" style={{ width: `${percentage}%` }}>
                                            <span className="tlv-option-index">{index + 1}</span>
                                            {option.text}
                                        </div>
                                        <span className="tlv-percentage">{percentage}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button onClick={handleNewQuestion} className="tlv-new-q-btn">+ Ask a new question</button>
                </div>

                {panelOpen && (
                    <div className="tlv-participants-view">
                        <div className="tlv-tabs">
                            <button
                                className={activeTab === 'chat' ? 'active' : ''}
                                onClick={() => setActiveTab('chat')}
                            >
                                Chat
                            </button>
                            <button
                                className={activeTab === 'participants' ? 'active' : ''}
                                onClick={() => setActiveTab('participants')}
                            >
                                Participants
                            </button>
                        </div>
                        <div className="tlv-tab-content">
                            {activeTab === 'participants' && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {finalParticipants.map(name => (
                                            <tr key={name}>
                                                <td>{name}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleKickStudent(name)}
                                                        className="kick-out-btn"
                                                    >
                                                        Kick out
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === 'chat' && (
                                <div className="chat-area">
                                    <div className="messages-container">
                                        {finalMessages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`chat-message ${msg.sender === 'Teacher' ? 'self' : 'other'}`}
                                            >
                                                <div className="message-bubble">
                                                    <div className="message-sender">{msg.sender}</div>
                                                    <div className="message-text">{msg.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <form className="chat-input-form" onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            className="chat-input"
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <button type="submit" className="send-btn">Send</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <button
                className="chat-icon-btn"
                aria-label="Open Chat"
                onClick={() => setPanelOpen(!panelOpen)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        </div>
    );
};

export default TeacherLiveView;
