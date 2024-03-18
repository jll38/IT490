import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Recipe() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md h-auto rounded-lg"
      />
      <p className="mt-4">{recipe.description}</p>
      <h2 className="text-2xl font-bold mt-6 mb-2">Nutrition Facts</h2>
      <ul>
        <li>Calories: {recipe.nutrition.calories}</li>
        <li>Protein: {recipe.nutrition.protein}g</li>
        <li>Fat: {recipe.nutrition.fat}g</li>
        <li>Carbs: {recipe.nutrition.carbs}g</li>
      </ul>
      {/* Add more details as needed */}
    </div>
  );
}
