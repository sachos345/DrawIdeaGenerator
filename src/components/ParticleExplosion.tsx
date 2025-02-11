// src/components/ParticleExplosion.tsx
import React, { useEffect } from "react";

interface ParticleExplosionProps {
  onComplete: () => void;
  x: number;
  y: number;
}

const ParticleExplosion: React.FC<ParticleExplosionProps> = ({
  onComplete,
  x,
  y,
}) => {
  // Increase the number of particles and randomize their colors.
  const particles = Array.from({ length: 20 });
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#A633FF",
    "#33FFF6",
  ];

  const getRandomOffset = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 50 + 20; // distance between 20 and 70 px
    return {
      x: Math.cos(angle) * distance + "px",
      y: Math.sin(angle) * distance + "px",
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 800); // Duration of explosion animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="particle-explosion"
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 100, // Ensure it appears above other elements
      }}
    >
      {particles.map((_, index) => {
        const offset = getRandomOffset();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={index}
            className="particle"
            style={
              {
                "--x": offset.x,
                "--y": offset.y,
                backgroundColor: randomColor,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

export default ParticleExplosion;
