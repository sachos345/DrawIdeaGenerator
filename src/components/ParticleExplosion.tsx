// src/components/ParticleExplosion.tsx
import React, { useEffect } from "react";

interface ParticleExplosionProps {
  onComplete: () => void;
}

const ParticleExplosion: React.FC<ParticleExplosionProps> = ({
  onComplete,
}) => {
  // Increase the number of particles to 20.
  const particles = Array.from({ length: 20 });

  // Define an array of colors to choose from.
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#A633FF",
    "#33FFF6",
  ];

  // Utility function to generate a random offset for each particle
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
    <div className="particle-explosion">
      {particles.map((_, index) => {
        const offset = getRandomOffset();
        // Choose a random color for each particle.
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
