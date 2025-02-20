// src/App.tsx
import React, { useState, useEffect } from "react";
import { categories } from "./data";
import CategorySelector from "./components/CategorySelector";
import TimerControls from "./components/TimerControls";
import FavoritesList from "./components/FavoritesList";
import IdeaCard from "./components/IdeaCard";
import FavoritesSidebar from "./components/FavoritesSidebar";
import IdeaHistory from "./components/IdeaHistory";
import ParticleExplosion from "./components/ParticleExplosion";
import "./App.css";

type Mode = "free" | "training";

interface Explosion {
  id: number;
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("free");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIdea, setCurrentIdea] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [ideaHistory, setIdeaHistory] = useState<string[]>([]);
  const [showIdeaHistory, setShowIdeaHistory] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>("");
  // Instead of a single explosion, maintain an array to allow multiple explosions.
  const [explosions, setExplosions] = useState<Explosion[]>([]);

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
    // Add the idea to the history (newest at the top)
    setIdeaHistory((prev) => [idea, ...prev]);
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

  const toggleIdeaHistory = () => {
    setShowIdeaHistory((prev) => !prev);
  };

  const copyIdea = async () => {
    try {
      await navigator.clipboard.writeText(currentIdea);
      setCopyFeedback("Copied!");
      setTimeout(() => setCopyFeedback(""), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // Adds a new explosion object with the mouse click coordinates.
  const addExplosion = (x: number, y: number) => {
    const newExplosion = { id: Date.now(), x, y };
    setExplosions((prev) => [...prev, newExplosion]);
  };

  // Removes an explosion from the array once its animation is complete.
  const removeExplosion = (id: number) => {
    setExplosions((prev) => prev.filter((exp) => exp.id !== id));
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

        {/* Idea Display with Sidebar */}
        <div className="idea-wrapper">
          <FavoritesSidebar
            showFavorites={showFavorites}
            toggleFavorites={toggleFavorites}
            showIdeaHistory={showIdeaHistory}
            toggleIdeaHistory={toggleIdeaHistory}
          />
          <div className="idea-display">
            {currentIdea ? (
              <IdeaCard idea={currentIdea} />
            ) : (
              <p>Loading idea...</p>
            )}
          </div>
        </div>

        {/* Action Buttons (Generate Idea, Copy and Favorite) */}
        <div className="action-buttons">
          <div>
            {mode === "free" && (
              <div className="generate-idea-container">
                <button
                  onClick={(e) => {
                    generateIdea();
                    // Spawn an explosion at the mouse position
                    addExplosion(e.clientX, e.clientY);
                  }}
                >
                  Generate Idea
                </button>
                {/* Render all active explosions */}
                {explosions.map((exp) => (
                  <ParticleExplosion
                    key={exp.id}
                    x={exp.x}
                    y={exp.y}
                    onComplete={() => removeExplosion(exp.id)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="copy-button-wrapper">
            <button onClick={copyIdea} className="action-copy-button">
              📋
            </button>
            {copyFeedback && (
              <span className="copy-feedback">{copyFeedback}</span>
            )}
          </div>
          <button
            onClick={() => addFavorite(currentIdea)}
            className="action-favorite-button"
          >
            ❤️
          </button>
        </div>

        {/* Training Mode Timer */}
        {mode === "training" && <TimerControls generateIdea={generateIdea} />}

        {/* Favorites List */}
        {showFavorites && (
          <FavoritesList
            favorites={favorites}
            removeFavorite={removeFavorite}
          />
        )}

        {/* Idea History (toggled via the sidebar) */}
        {showIdeaHistory && <IdeaHistory history={ideaHistory} />}
      </main>
    </div>
  );
};

export default App;
