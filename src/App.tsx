// src/App.tsx
import React, { useState, useEffect } from "react";
import { categories } from "./data";
import CategorySelector from "./components/CategorySelector";
import TimerControls from "./components/TimerControls";
import FavoritesList from "./components/FavoritesList";
import IdeaCard from "./components/IdeaCard";
import FavoritesSidebar from "./components/FavoritesSidebar";
import "./App.css";

type Mode = "free" | "training";

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("free");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIdea, setCurrentIdea] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // Load favorites from local storage on initial mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to local storage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Automatically generate a prompt when the app loads
  useEffect(() => {
    generateIdea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateIdea = () => {
    let availableCategories = [];
    if (selectedCategory === "All") {
      availableCategories = categories;
    } else {
      const found = categories.find((cat) => cat.name === selectedCategory);
      availableCategories = found ? [found] : [];
    }
    if (availableCategories.length === 0) {
      setCurrentIdea("No idea available for the selected category.");
      return;
    }
    const randomCategoryIndex = Math.floor(
      Math.random() * availableCategories.length
    );
    const category = availableCategories[randomCategoryIndex];
    const prompts = category.prompts;
    const randomPromptIndex = Math.floor(Math.random() * prompts.length);
    const idea = prompts[randomPromptIndex];
    setCurrentIdea(idea);
  };

  const addFavorite = (idea: string) => {
    if (!favorites.includes(idea)) {
      setFavorites([...favorites, idea]);
    }
  };

  const removeFavorite = (idea: string) => {
    setFavorites(favorites.filter((fav) => fav !== idea));
  };

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <div className="app-container">
      <header>
        <h1>ArtSpark</h1>
        <p className="subtitle">A simple idea generator to get you started</p>
        <div className="mode-selection">
          <button
            onClick={() => setMode("free")}
            className={mode === "free" ? "active" : ""}
          >
            Free Drawing
          </button>
          <button
            onClick={() => setMode("training")}
            className={mode === "training" ? "active" : ""}
          >
            Training Mode
          </button>
        </div>
      </header>

      <main>
        <div className="category-container">
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Wrap the idea display and the sidecard together */}
        <div className="idea-wrapper">
          <FavoritesSidebar
            showFavorites={showFavorites}
            toggleFavorites={toggleFavorites}
          />
          <div className="idea-display">
            {currentIdea ? (
              <IdeaCard idea={currentIdea} />
            ) : (
              <p>Loading idea...</p>
            )}
          </div>
        </div>

        {/* Action row with Generate Idea on the left and Favorite (heart) on the right */}
        <div className="action-buttons">
          <button onClick={generateIdea}>Generate Idea</button>
          <button
            onClick={() => addFavorite(currentIdea)}
            className="action-favorite-button"
          >
            ❤️
          </button>
        </div>

        {mode === "training" && <TimerControls generateIdea={generateIdea} />}

        {showFavorites && (
          <FavoritesList
            favorites={favorites}
            removeFavorite={removeFavorite}
          />
        )}
      </main>
    </div>
  );
};

export default App;
