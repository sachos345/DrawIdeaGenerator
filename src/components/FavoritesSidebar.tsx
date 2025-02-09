// src/components/FavoritesSidebar.tsx
import React from "react";

interface FavoritesSidebarProps {
  showFavorites: boolean;
  toggleFavorites: () => void;
}

const FavoritesSidebar: React.FC<FavoritesSidebarProps> = ({
  showFavorites,
  toggleFavorites,
}) => {
  return (
    <div className="favorites-sidebar">
      <div className="sidebar-tab">
        <span role="img" aria-label="favorites">
          ❤️
        </span>
      </div>
      <div className="sidebar-content">
        <button onClick={toggleFavorites}>
          {showFavorites ? "Hide ❤️" : "Show ❤️"}
        </button>
      </div>
    </div>
  );
};

export default FavoritesSidebar;
