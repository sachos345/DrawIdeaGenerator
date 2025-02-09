// src/components/IdeaHistory.tsx
import React from "react";

interface IdeaHistoryProps {
  history: string[];
}

const IdeaHistory: React.FC<IdeaHistoryProps> = ({ history }) => {
  return (
    <div className="idea-history">
      <h3>Idea History</h3>
      {history.length === 0 ? (
        <p>No previous ideas.</p>
      ) : (
        <ul>
          {history.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IdeaHistory;
