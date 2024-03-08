import React from "react";

import "./SubNav.css";
export default function SubNav() {
  return (
    <nav className="sub-nav">
      <div className="items-area">
        <button onClick={() => {window.location.assign('/trending')}}>Trending</button>
        <button onClick={() => {window.location.assign('/meal-plans')}}>Meal Plans</button>
        <button onClick={() => {window.location.assign('/recipes')}}>Recipes</button>
        <button onClick={() => {window.location.assign('/ingredients')}}>Ingredients</button>
        <button onClick={() => {window.location.assign('/calculator')}}>Nutrition Calculator</button>
      </div>
    </nav>
  );
}
