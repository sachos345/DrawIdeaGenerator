// src/components/FavoritesSidebar.tsx
import React from "react";

interface FavoritesSidebarProps {
  showFavorites: boolean;
  toggleFavorites: () => void;
  showIdeaHistory: boolean;
  toggleIdeaHistory: () => void;
}

const FavoritesSidebar: React.FC<FavoritesSidebarProps> = ({
  showFavorites,
  toggleFavorites,
  showIdeaHistory,
  toggleIdeaHistory,
}) => {
  return (
    <div className="favorites-sidebar">
      <div className="sidebar-tab">
        <span role="img" aria-label="menu">
          ☰
        </span>
      </div>
      <div className="sidebar-content">
        <button onClick={toggleFavorites}>
          {showFavorites ? "Hide ❤️" : "Show ❤️"}
        </button>
        <button onClick={toggleIdeaHistory}>
          {showIdeaHistory ? "Hide 📜" : "Show 📜"}
        </button>
      </div>
    </div>
  );
};

export default FavoritesSidebar;
