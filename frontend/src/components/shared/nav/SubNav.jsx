import React from "react";

import "./SubNav.css";
export default function SubNav() {
  return (
    <nav className="sub-nav">
      <div className="items-area">
        <div>Trending</div>
        <div>Meal Plans</div>
        <div>Recipes</div>
        <div>Ingredients</div>
        <div>Calculator</div>
      </div>
    </nav>
  );
}
