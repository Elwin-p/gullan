import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('name').value;
    if (nameVal) localStorage.setItem('prankName', nameVal);
    
    if (clickCount === 0) {
      setErrorMsg('Weak password, add Alpha Numeric Characters');
      setClickCount(1);
    } else {
      navigate('/otp');
    }
  };

  const handleMouseEnter = () => {
    setIsMoving(true);
    setPosition({ x: 0, y: 0 });
    setTimeout(() => {
      setIsMoving(false);
      setPosition({ x: 0, y: 0 });
    }, 5000);
  };

  useEffect(() => {
    if (!isMoving) return;
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isMoving]);

  return (
    <div className="card">
      {/* <span className="card-icon"></span> */}
      <h1>Welcome back</h1>
      <p className="subtitle">Enter your details to continue</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your full name" required autoFocus />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="your password" required />
          {errorMsg && <p style={{ color: '#ff4d4f', marginTop: '0.5rem', fontSize: '0.875rem' }}>{errorMsg}</p>}
        </div>

        <button type="submit" className="btn btn-primary" onMouseEnter={handleMouseEnter} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>Continue →</button>
      </form>
    </div>
  );
}
