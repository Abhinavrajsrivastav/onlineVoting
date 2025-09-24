import React, { useState } from 'react';
import './TeacherPage.css';
import { useNavigate } from 'react-router-dom';

let nextId = 3;

const TeacherPage = ({ socket }) => {
    const [question, setQuestion] = useState('');
    const [timeLimit, setTimeLimit] = useState('60');
    const [options, setOptions] = useState([
        { id: 1, text: '', isCorrect: null },
        { id: 2, text: '', isCorrect: null }
    ]);

    const navigate = useNavigate();

    const handleOptionTextChange = (id, newText) => {
        setOptions(options.map(opt => (opt.id === id ? { ...opt, text: newText } : opt)));
    };

    const handleOptionCorrectChange = (id, value) => {
        setOptions(options.map(opt => (opt.id === id ? { ...opt, isCorrect: value } : opt)));
    };

    const handleAddOption = () => {
        setOptions([...options, { id: nextId++, text: '', isCorrect: null }]);
    };

    const handleAskQuestion = () => {
        if (!question.trim()) {
            alert('Please enter a question.');
            return;
        }
        if (options.some(opt => !opt.text.trim())) {
            alert('Please fill out all option fields.');
            return;
        }
        if (options.some(opt => opt.isCorrect === null)) {
            alert('Please mark Yes or No for all options.');
            return;
        }

        const pollData = {
            question,
            options,
            timeLimit
        };

        socket.emit('start-poll', pollData);
        navigate('/livePoll');
    };

    return (
        <div className="teacher-page-container">
            <div className="poll-tag">+ Interactive Poll</div>
            <h1 className="main-heading">Let's Get Started</h1>
            <p className="sub-heading">
                You'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
            </p>

            <div className="form-section">
                <div className="question-header">
                    <label htmlFor="question" className="form-label">Enter your question</label>
                    <select value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} className="timer-dropdown">
                        <option value="30">30 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="90">90 seconds</option>
                    </select>
                </div>
                <textarea
                    id="question"
                    className="question-textarea"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    maxLength="100"
                    placeholder="Type your question here..."
                />
                <p className="char-counter">{question.length}/100</p>
            </div>

            <div className="form-section">
                <div className="options-header">
                    <label className="form-label">Edit Options</label>
                    <label className="form-label">Is it Correct?</label>
                </div>
                <div className="options-list">
                    {options.map((option, index) => (
                        <div key={option.id} className="option-item">
                            <span className="option-number">{index + 1}</span>
                            <input
                                type="text"
                                className="option-input"
                                value={option.text}
                                onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                            />
                            <div className="correct-answer-group">
                                <input
                                    type="radio"
                                    id={`yes-${option.id}`}
                                    name={`correct-${option.id}`}
                                    checked={option.isCorrect === true}
                                    onChange={() => handleOptionCorrectChange(option.id, true)}
                                />
                                <label htmlFor={`yes-${option.id}`}>Yes</label>

                                <input
                                    type="radio"
                                    id={`no-${option.id}`}
                                    name={`correct-${option.id}`}
                                    checked={option.isCorrect === false}
                                    onChange={() => handleOptionCorrectChange(option.id, false)}
                                />
                                <label htmlFor={`no-${option.id}`}>No</label>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleAddOption} className="add-option-btn">+ Add More option</button>
            </div>

            <div className="bottom-bar">
                <button onClick={handleAskQuestion} className="submit-question-btn">Ask Question</button>
            </div>
        </div>
    );
};

export default TeacherPage;
