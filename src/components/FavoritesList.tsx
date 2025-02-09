// src/components/FavoritesList.tsx
import React from "react";

interface FavoritesListProps {
  favorites: string[];
  removeFavorite: (idea: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  removeFavorite,
}) => {
  return (
    <div className="favorites-list">
      <h3>Favorite Ideas</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((idea, index) => (
            <li key={index}>
              {idea}{" "}
              <button onClick={() => removeFavorite(idea)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
