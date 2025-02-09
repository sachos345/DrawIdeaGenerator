// src/components/TimerControls.tsx
import React, { useState, useEffect } from "react";
import ParticleExplosion from "./ParticleExplosion";

interface TimerControlsProps {
  generateIdea: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ generateIdea }) => {
  const [duration, setDuration] = useState<number>(300);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showStartExplosion, setShowStartExplosion] = useState<boolean>(false);

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

  const handleStart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
    setIsPaused(false);
    setShowStartExplosion(true); // Trigger explosion on Start
    generateIdea();
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setShowStartExplosion(false); // Ensure explosion is cleared when stopping
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
            {showStartExplosion && (
              <ParticleExplosion
                onComplete={() => setShowStartExplosion(false)}
              />
            )}
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
