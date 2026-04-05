import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lemmeImage from './assets/lemmecheck-gullan-removebg-preview.png';

export default function Login() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);
  const [isWait, setIsWait] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isWait) return;

    const nameVal = document.getElementById('name').value;
    if (nameVal) localStorage.setItem('prankName', nameVal);

    if (clickCount === 0) {
      setErrorMsg('Weak password, add Alpha Numeric Characters');
      setShowImage(true);
      setClickCount(1);
      setIsWait(true);
      setTimeout(() => setIsWait(false), 3000);
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
    }, 3000);
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

  const handleTouchStart = (e) => {
    if (!isMoving) {
      e.preventDefault(); // Prevents the first tap from clicking so it runs away
      handleMouseEnter();
    }
  };

  return (
    <div className="card">
      {/* <span className="card-icon"></span> */}
      <h1>Welcome back</h1>
      <p className="subtitle">Enter your details to continue</p>

      {showImage && (
        <img
          src={lemmeImage}
          alt="lemme check"
          className="pop-image"
        />
      )}

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

        <button
          type="submit"
          className="btn btn-primary"
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isMoving ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out'
          }}
        >
          Continue →
        </button>
      </form>
    </div>
  );
}
