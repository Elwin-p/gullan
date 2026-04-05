import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Alert({ isOpen, message, onClose, buttons = [] }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleButtonClick = (action) => {
    if (action === 'close') {
      onClose?.();
    } else if (action === 'navigate') {
      navigate('/SmilePls');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '1.5rem',
      }}
    >
      <div 
        className="card"
        style={{
          maxWidth: '420px',
          width: '100%',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          margin: 0
        }}
      >
        <p style={{ fontSize: '1.15rem', fontWeight: '500', marginBottom: '2rem', color: '#fafafa', lineHeight: '1.5' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexDirection: 'column' }}>
          {buttons.map((btn, idx) => {
            const isPrimary = idx === buttons.length - 1;
            const btnClass = isPrimary ? 'btn btn-primary' : 'btn btn-ghost';
            return (
              <button
                key={idx}
                className={btnClass}
                onClick={() => handleButtonClick(btn.action)}
                style={{ margin: 0 }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
