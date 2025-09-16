import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import SavedRecipes from "./savedRecipes";
import RecipeDetail from "./RecipeDetail";
import "./App.css";

export default function App() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("savedRecipes");
    if (stored) {
      setSavedRecipes(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever list updates
  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">🏠 Home</Link>
        <Link to="/saved">⭐ Saved Recipes</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes} />}
        />
        <Route
          path="/saved"
          element={<SavedRecipes savedRecipes={savedRecipes} />}
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetail savedRecipes={savedRecipes} />}
        />
      </Routes>
    </Router>
  );
}
