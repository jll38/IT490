import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../../components/shared/StarRating/StarRating";
export default function Recipe() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/recipes/${id}`)
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
      <h1 className="text-3xl font-bold mb-4">{recipe.recipe_name}</h1>
      <img
        src={recipe.image_url}
        alt={recipe.recipe_name}
        className="w-full max-w-md max-h-[300px] h-auto rounded-lg object-fill"
      />
      <StarRating
        editable={false}
        level={recipe.average_rating}
        recipe={recipe}
      />
      <StarRating editable={true} level={5} recipe={recipe} />
      <p className="mt-4">{recipe.instructions}</p>
      <h2 className="text-2xl font-bold mt-6 mb-2">Nutrition Facts</h2>
      <ul>
        <li>Calories: {recipe.calories}</li>
        <li>Protein: {Number(recipe.protein, 0)}g</li>
        <li>Fat: {Number(recipe.fat, 0)}g</li>
        <li>Carbs: {Number(recipe.carbs, 0)}g</li>
      </ul>
    </div>
  );
}
