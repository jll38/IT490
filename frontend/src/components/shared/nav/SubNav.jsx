import React from "react";

import "./SubNav.css";
export default function SubNav() {
  return (
    <nav className="sub-nav">
      <div className="items-area">
        <button onClick={() => {window.location.assign('/trending')}}>Trending</button>
        <button onClick={() => {window.location.assign('/shopping-list')}}>Shopping List</button>
        <button onClick={() => {window.location.assign('/recipes')}}>Recipes</button>
        <button onClick={() => {window.location.assign('/ingredients')}}>Ingredients</button>
        <button onClick={() => {window.location.assign('/forum')}}>Forum</button>

      </div>
    </nav>
  );
}
