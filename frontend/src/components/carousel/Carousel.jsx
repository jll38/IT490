import React, { useState } from "react";
import RecipeSearchBox from "../recipe/RecipeSearchBox";
import "./Carousel.css"
export default function RecipeCarousel({ recipes }) {
  return (
    <div className="flex">
      <div className="carouselContainer overflow-hidden">
        <div className="flex  overflow-x-scroll">
          {recipes.map((recipe, i) => {
            return (
              i < 6 && (
                <RecipeSearchBox
                  className="recipeCard"
                  recipe={recipe}
                  key={`recently-viewed-${i}`}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}
