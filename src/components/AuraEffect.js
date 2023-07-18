import React, { useState, useEffect } from 'react';
import '../css/AuraEffect.css';

const AuraEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="aura-effect"
      style={{ left: position.x, top: position.y }}
    ></div>
  );
};

export default AuraEffect;
