// src/components/IdeaCard.tsx
import React, { useState, useEffect } from "react";

interface IdeaCardProps {
  idea: string;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setShake(true);
    const timer = setTimeout(() => setShake(false), 500); // Shake lasts 500ms
    return () => clearTimeout(timer);
  }, [idea]);

  return (
    <div className={`idea-card ${shake ? "shake" : ""}`}>
      <p className="idea-text">{idea}</p>
    </div>
  );
};

export default IdeaCard;
