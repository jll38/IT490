import React from "react";
import { useParams } from "react-router-dom";

export default function IngredientPage() {
  const { id } = useParams();
  return <div>Ingredient: {id}</div>;
}
