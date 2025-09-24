import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import io from 'socket.io-client';

// Import Pages
import LandingPage from '../src/Pages/LandingPage/LandingPage';
import StudentNamePage from '../src/Pages/StudentPage/StudentNamePage';
import TeacherPage from '../src/Pages/TeacherPage/TecherPage';
import StudentVotingPage from '../src/Pages/StudentPage/StudentVotingPage';
import TeacherLiveView from '../src/Pages/TeacherPage/TeacherLiveView/TeacherLiveView'; // New Teacher Dashboard
import WaitingPage from './Pages/WaitingPage/WatingPage';

const socket = io.connect("http://localhost:4000");

function App() {
  const [poll, setPoll] = useState({ isActive: false, question: '', options: [] });
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.on('poll-update', (data) => setPoll(data));
    socket.on('participants-update', (data) => setParticipants(data));

    return () => {
      socket.off('poll-update');
      socket.off('participants-update');
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student" element={<StudentNamePage socket={socket} />} />
        <Route path="/teacher" element={<TeacherPage socket={socket} />} />
        <Route path="/poll" element={<StudentVotingPage socket={socket} poll={poll} />} />
        <Route path="/teacher/live" element={<TeacherLiveView socket={socket} poll={poll} participants={participants} />} />
        <Route path="/voting" element={<WaitingPage />} />
        <Route path="/livePoll" element={<TeacherLiveView socket={socket} poll={poll} participants={participants} />} />
      </Routes>
    </Router>
  );
}

export default App;