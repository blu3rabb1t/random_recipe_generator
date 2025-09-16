import React from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail({ savedRecipes }) {
  const { id } = useParams();
  const recipe = savedRecipes.find(r => r.idMeal === id);

  if (!recipe) {
    return (
      <div className="app">
        <h2>Recipe not found</h2>
        <Link to="/saved" className="button">Go Back</Link>
      </div>
    );
  }

  const getIngredients = () => {
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

  return (
    <div className="app">
      <h1 className="title">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />

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

      <br />
      <Link to="/saved" className="button" style={{ marginTop: "20px" }}>
        🔙 Back to Saved
      </Link>
    </div>
  );
}
