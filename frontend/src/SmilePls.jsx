import React, { useState, useEffect, useRef } from 'react';
import scary1 from './assets/scary1.png';
import scary2 from './assets/scary2.png';

export default function SmilePls() {
  const [prankImage, setPrankImage] = useState(null);
  const [showCapture, setShowCapture] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);
  const [hasStream, setHasStream] = useState(false);

  useEffect(() => {
    const images = [scary1, scary2];
    const picked = images[Math.floor(Math.random() * images.length)];
    setSelectedImage(picked);
    
    const img = new Image();
    img.src = picked;

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
    setPrankImage(selectedImage);
  };

  if (prankImage) {
    const name = localStorage.getItem('prankName') || '';
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img 
          src={prankImage} 
          alt="Jump scare!" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 1 }} 
        />
        <h1 style={{
          position: 'absolute',
          zIndex: 2,
          color: '#ff0000',
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          textAlign: 'center',
          textShadow: '0 0 10px #000, 0 0 20px #000, 0 0 30px #000',
          fontWeight: 900,
          margin: 0,
          padding: '20px'
        }}>
          {name ? `പേടിച്ചോ ${name}? heh` : 'പേടിച്ചോ? heh'}
        </h1>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Smile Please! 📸</h1>
      <p className="subtitle" style={{ marginBottom: '1.2rem', textAlign: 'center' }}>Wait, we need to take a quick photo for verification</p>

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
      </div>
      
      {showCapture && (
        <button 
          onClick={handleCapture}
          className="btn btn-primary" 
          style={{ marginTop: '1.5rem', width: '100%' }}
        >
          Capture 📸
        </button>
      )}
    </div>
  );
}
