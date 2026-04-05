import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import OTP from './OTP';
import SmilePls from './SmilePls';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/SmilePls" element={<SmilePls />} />
    </Routes>
  );
}

export default App;
