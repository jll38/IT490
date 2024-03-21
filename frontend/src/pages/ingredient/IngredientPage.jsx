import React from "react";
import { useParams } from "react-router-dom";

export default function IngredientPage() {
  const { id } = useParams();
  const ingredient = {
    name: "Flour",
    servingSize: "100g",
    nutrition: {
      calories: 364,
      protein: 10,
      fat: 1,
      carbs: 76,
    },
    image: "https://cdn11.bigcommerce.com/s-ihwnd7z21q/images/stencil/original/products/1258/4897/king-arthur-unbleached-all-purpose-flour-5-lb-1__96453__68278__72623.1684333819.jpg?c=1",
    description:
      "A powdery substance obtained by grinding grain, typically wheat, and used to bake bread, cakes, and pastry.",
  };

  return (
    <div className="pageContainer px-4 py-8 flex justify-center">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {ingredient.image && (
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{ingredient.name}</h1>
          <p className="mb-4 text-sm text-gray-600">Serving Size: {ingredient.servingSize}</p>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Nutrition Facts</h2>
          <ul className="mb-4">
            <li className="text-sm text-gray-600">Calories: {ingredient.nutrition.calories} kcal</li>
            <li className="text-sm text-gray-600">Protein: {ingredient.nutrition.protein} g</li>
            <li className="text-sm text-gray-600">Fat: {ingredient.nutrition.fat} g</li>
            <li className="text-sm text-gray-600">Carbs: {ingredient.nutrition.carbs} g</li>
          </ul>
          {ingredient.description && <p className="text-sm text-gray-600">{ingredient.description}</p>}
        </div>
      </div>
    </div>
  );
}
