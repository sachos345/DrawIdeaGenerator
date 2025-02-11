// src/components/TimerControls.tsx
import React, { useState, useEffect } from "react";
import ParticleExplosion from "./ParticleExplosion";

interface TimerControlsProps {
  generateIdea: () => void;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
}

const TimerControls: React.FC<TimerControlsProps> = ({ generateIdea }) => {
  const [duration, setDuration] = useState<number>(300);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [explosions, setExplosions] = useState<Explosion[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            generateIdea();
            return duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, isPaused, duration, generateIdea]);

  const addExplosion = (x: number, y: number) => {
    const newExplosion = { id: Date.now(), x, y };
    setExplosions((prev) => [...prev, newExplosion]);
  };

  const removeExplosion = (id: number) => {
    setExplosions((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTimeLeft(duration);
    setIsRunning(true);
    setIsPaused(false);
    // Capture mouse coordinates on button click:
    addExplosion(e.clientX, e.clientY);
    generateIdea();
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    // Optionally clear explosions (or let them finish)
    setExplosions([]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="timer-controls">
      <h3>Training Mode Timer</h3>
      <div className="timer-settings">
        <label htmlFor="duration">Select Duration: </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => {
            const newDuration = parseInt(e.target.value);
            setDuration(newDuration);
            setTimeLeft(newDuration);
          }}
        >
          <option value={300}>5 Minutes</option>
          <option value={600}>10 Minutes</option>
          <option value={900}>15 Minutes</option>
        </select>
      </div>
      <div className="timer-display">
        <span>Time Left: {formatTime(timeLeft)}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="timer-buttons">
        {!isRunning ? (
          <div className="button-container">
            <button onClick={handleStart}>Start Training</button>
            {explosions.map((exp) => (
              <ParticleExplosion
                key={exp.id}
                x={exp.x}
                y={exp.y}
                onComplete={() => removeExplosion(exp.id)}
              />
            ))}
          </div>
        ) : (
          <>
            <button onClick={handlePauseResume}>
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button onClick={handleStop}>Stop Training</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerControls;
