import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Load saved recipes from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("savedRecipes");
    if (stored) {
      setSavedRecipes(JSON.parse(stored));
    }
  }, []);

  // Fetch a random recipe
  const getRandomRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
    setLoading(false);
  };

  // Extract ingredients
  const getIngredients = () => {
    if (!recipe) return [];
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  // Save recipe to localStorage
  const saveRecipe = () => {
    if (!recipe) return;
    const exists = savedRecipes.find(r => r.idMeal === recipe.idMeal);
    if (exists) return; // avoid duplicates
    const updated = [...savedRecipes, recipe];
    setSavedRecipes(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1 className="title">🍳 Random Recipe Generator</h1>
      <button className="button" onClick={getRandomRecipe}>
        {loading ? "Loading..." : "Get Recipe"}
      </button>

      {recipe && (
        <div className="card fade-in">
          <h2 className="recipe-title">{recipe.strMeal}</h2>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-image"
          />
          <div className="recipe-section">
            <h4>Ingredients</h4>
            <ul>
              {getIngredients().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-section">
            <h4>Instructions</h4>
            <p>{recipe.strInstructions}</p>
          </div>
          {recipe.strYoutube && (
            <a
              className="video-link"
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              🎥 Watch on YouTube
            </a>
          )}
          <button className="save-button" onClick={saveRecipe}>
            ⭐ Save Recipe
          </button>
        </div>
      )}

      {savedRecipes.length > 0 && (
        <div className="saved-section">
          <h2>📚 Saved Recipes</h2>
          <div className="saved-grid">
            {savedRecipes.map(r => (
              <div key={r.idMeal} className="saved-card">
                <img src={r.strMealThumb} alt={r.strMeal} />
                <p>{r.strMeal}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
