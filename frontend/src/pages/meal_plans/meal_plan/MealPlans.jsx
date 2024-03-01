import React from "react";
import { useParams } from "react-router-dom";

export default function MealPlans() {
  const { id } = useParams();
  return <div>Meal Plan Id: {id}</div>;
}
