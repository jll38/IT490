import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function StarRating({
  totalStars = 5,
  editable = true,
  level = 0,
  recipe,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (newHoverRating) => {
    setHoverRating(newHoverRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  if (recipe)
    return (
      <div>
        {editable ? (
          <div className="text-sm text-gray-700">Rate this recipe</div>
        ) : (
          <></>
        )}
        <div className="flex items-center">
          {[...Array(totalStars)].map((star, index) => {
            const ratingValue = index + 1;

            return editable ? (
              <FontAwesomeIcon
                key={ratingValue}
                icon={
                  ratingValue <= (hoverRating || rating)
                    ? solidStar
                    : regularStar
                }
                className={`cursor-pointer ${
                  ratingValue <= (hoverRating || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onMouseOver={() => handleMouseOver(ratingValue)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(ratingValue)}
              />
            ) : (
              <FontAwesomeIcon
                key={ratingValue}
                icon={index < level ? solidStar : regularStar}
                className={"text-yellow-500"}
              />
            );
          })}
        </div>
      </div>
    );
}
