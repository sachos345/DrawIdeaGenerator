// src/components/TimerControls.tsx
import React, { useState, useEffect } from "react";

interface TimerControlsProps {
  generateIdea: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ generateIdea }) => {
  // Default duration: 5 minutes (300 seconds)
  const [duration, setDuration] = useState<number>(300);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // When time is up, generate a new idea and reset the timer
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
  }, [isRunning, timeLeft, duration, generateIdea]);

  const handleStart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
    generateIdea(); // Generate an idea immediately when training starts
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  // Helper function to format seconds as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="timer-controls">
      <h3>Training Mode Timer</h3>
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
      <div className="timer-display">
        <span>Time Left: {formatTime(timeLeft)}</span>
      </div>
      {!isRunning ? (
        <button onClick={handleStart}>Start Training</button>
      ) : (
        <button onClick={handleStop}>Stop Training</button>
      )}
    </div>
  );
};

export default TimerControls;
