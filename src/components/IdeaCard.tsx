// src/components/IdeaCard.tsx
import React from "react";

interface IdeaCardProps {
  idea: string;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  return (
    <div className="idea-card">
      <p className="idea-text">{idea}</p>
    </div>
  );
};

export default IdeaCard;
