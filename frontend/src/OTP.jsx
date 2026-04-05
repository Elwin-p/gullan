import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

export default function OTP() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleResend = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleDigitChange = (e, index) => {
    const val = e.target.value;
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <Alert
        isOpen={showAlert}
        message="haha otp? athoke namuk veno ehh :D"
        onClose={handleAlertClose}
        buttons={[
          {
            label: 'go back',
            action: 'navigate',
            color: '#0a0a0a',
            textColor: '#fff',
          },
          {
            label: 'enneyum enthenlum indo',
            action: 'navigate',
            color: '#fafafa',
            textColor: '#0a0a0a',
            borderColor: '#000000'
          },
        ]}
      />
      <div className="card">
        {/* <span className="card-icon">🔐</span> */}
        <h1>Verify your email</h1>
        <p className="subtitle">We sent a 6-digit code to your inbox</p>

        <div className="otp-input-wrap">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              maxLength={1}
              inputMode="numeric"
              onChange={(e) => handleDigitChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        <div className="timer-display">
          {timeLeft}<span className="sec">s</span>
        </div>

        <p className="timer-hint">
          {timeLeft > 0 ? 'Waiting for code...' : 'Time\'s up! Request a new one.'}
        </p>

        <div className="divider"></div>

        <button
          type="button"
          onClick={handleResend}
          className="btn btn-ghost"
        >
          Resend code
        </button>
      </div>
    </>
  );
}
