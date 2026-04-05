import React, { useState, useEffect, useRef } from 'react';
import scary1 from './assets/mamuuka.webp';
import scary2 from './assets/salimkumar.jpg';
import laughAudio from './assets/mg-laugh.mp3';

export default function SmilePls() {
  const [step, setStep] = useState('capture'); // 'capture', 'captured', 'show'
  const [showCapture, setShowCapture] = useState(false);
  const [prankImages] = useState([scary1, scary2]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);
  const audioRef = useRef(null);
  const [hasStream, setHasStream] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(laughAudio);
    setCurrentImageIndex(Math.floor(Math.random() * 2));

    // preload
    const img1 = new Image(); img1.src = scary1;
    const img2 = new Image(); img2.src = scary2;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          localStreamRef.current = stream;
          setHasStream(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setShowCapture(true);
        })
        .catch(() => {
          setShowCapture(true);
        });
    } else {
      setShowCapture(true);
    }

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setStep('captured');
  };

  const handleShow = () => {
    setStep('show');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.error("Audio playback blocked", e));
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.location.href = '/SmilePls';
  };

  const handleRecapture = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 2);
  };

  const name = localStorage.getItem('prankName') || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2rem' }}>
      <div className="card" style={{ maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {step === 'show' ? (
          <h1 style={{ color: '#ab508aff', textShadow: '0 0 10px #000', textAlign: 'center', fontSize: '2rem', marginBottom: '1.2rem' }}>
            {'bootifull'}
          </h1>
        ) : (
          <>
            <h1>Smile Please! 📸</h1>
            <p className="subtitle" style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
              {step === 'captured' ? 'Photo captured successfully!' : 'Wait, we need to take a quick photo for verification'}
            </p>
          </>
        )}

        <div style={{
          width: '100%',
          aspectRatio: '3/4',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative'
        }}>
          {step === 'capture' && (
            <>
              {!showCapture && <p style={{ color: '#a3a3a3', fontSize: '0.85rem', position: 'absolute' }}>Waiting for response...</p>}
              {showCapture && !hasStream && (
                <p style={{ color: '#a3a3a3', fontSize: '0.85rem', position: 'absolute' }}>Camera Offline</p>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: hasStream ? 'block' : 'none'
                }}
              />
            </>
          )}

          {step === 'captured' && (
            <p style={{ color: '#00ff88', fontSize: '1rem', fontWeight: 'bold' }}>📸 Photo processed!</p>
          )}

          {step === 'show' && (
            <img
              src={prankImages[currentImageIndex]}
              alt="Jump scare!"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>

        {showCapture && step === 'capture' && (
          <button
            onClick={handleCapture}
            className="btn btn-primary"
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            Capture 📸
          </button>
        )}

        {step === 'captured' && (
          <button
            onClick={handleShow}
            className="btn btn-primary"
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            Show
          </button>
        )}

        {step === 'show' && (
          <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '1.5rem' }}>
            <button
              onClick={handleRecapture}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Recapture
            </button>
            <button
              onClick={handleClose}
              className="btn"
              style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <div className="card" style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgb(235, 235, 235)' }}>About This Site (gullan  ) </h2>
        <p style={{ color: '#a3a3a3', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Namaskaram. As u guessed this laugh audio is from mg sreekumar. The features (pranks) of this website include moving button
          , the weak password (its just a fake thing) and the otp. No backend, no verification. And ofc credits to mamooty and salim kumar for their photos.
          gotta thank them. Our team name is gullan which means joker. 
        </p>
        <p style={{ color: '#a3a3a3', fontSize: '0.95rem', marginTop: '1rem' }}>
          No actual data or photos are saved—this is completely client-side and just for laughs. Enjoy!
        </p>
        <p style={{ color: '#a3a3a3', fontSize: '0.95rem', marginTop: '1rem' }}>
          ** if u clicked enter while login, u wont be able to see the moving button
        </p>
      </div>
    </div>
  );
}
