import React from "react";
import { useParams } from "react-router-dom";
import RecipeSearchBox from "../../components/recipe/RecipeSearchBox";
export default function RecipesSearch() {
  const { id } = useParams();
  return <div><RecipeSearchBox/></div>;
}
