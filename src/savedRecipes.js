import React from "react";
import { Link } from "react-router-dom";

export default function SavedRecipes({ savedRecipes }) {
  return (
    <div className="app">
      <h1 className="title">⭐ Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p>No recipes saved yet.</p>
      ) : (
        <div className="saved-grid">
          {savedRecipes.map(r => (
            <Link key={r.idMeal} to={`/recipe/${r.idMeal}`} className="saved-card">
              <img src={r.strMealThumb} alt={r.strMeal} />
              <p>{r.strMeal}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
