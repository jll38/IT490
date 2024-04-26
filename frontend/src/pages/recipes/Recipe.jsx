import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../../components/shared/StarRating/StarRating";

import { BACKEND } from "../../lib/constants";
export default function Recipe() {
  let { id } = useParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    fetch(`${BACKEND}/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
        console.log(data);
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

  if (!recipe && !isLoading) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md max-h-[300px] h-auto rounded-lg object-fill"
      />
      <p>Serves: {recipe.servings}</p>
      <StarRating
        editable={false}
        level={recipe.average_rating}
        recipe={recipe}
      />
      <StarRating editable={true} level={5} recipe={recipe} />
      <h2 className="text-2xl font-bold mt-6 mb-2">Summary</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Instructions</h2>
      <p className="mt-4">{recipe.instructions}</p>
      <h2 className="text-2xl font-bold mt-6 mb-2">Nutrition Facts</h2>
      <ul>
        <li>
          {recipe.nutrition.nutrients[0].name}:{" "}
          {Math.ceil(recipe.nutrition.nutrients[0].amount)}
        </li>
        <li>
          {recipe.nutrition.nutrients[8].name}:{" "}
          {Math.floor(recipe.nutrition.nutrients[8].amount)}g
        </li>
        <li>
          {recipe.nutrition.nutrients[3].name}:{" "}
          {Math.floor(recipe.nutrition.nutrients[3].amount)}g
        </li>
        <li>
          {recipe.nutrition.nutrients[1].name}:{" "}
          {Math.floor(recipe.nutrition.nutrients[1].amount)}g
        </li>
      </ul>
    </div>
  );
}
