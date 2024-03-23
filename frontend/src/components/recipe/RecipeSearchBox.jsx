import React from "react";
import { Card, Inset, Text, Strong } from "@radix-ui/themes";
import StarRating from "../shared/StarRating/StarRating";
import Badge from "../badge/Badge.jsx";
export default function RecipeSearchBox({ recipe }) {
  
  return (
    <Card asChild size="2" style={{ width: 300, maxHeight: 340 }}>
      <a href={`recipes/${recipe.id}`}>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={recipe.src}
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Text as="p" size="3">
          <Strong>{recipe.recipe_name}</Strong>
        </Text>
        <StarRating editable={false} level={Number(recipe.average_rating)} recipe={recipe}/>
        <Text className="text-gray-700">Prep Time: {recipe.preparation_time} Minutes</Text>
        <br />
        <Text size="2">{recipe.calories} Calories</Text>
        <br />
        <Text size="2">
          {Number(recipe.protein,0)}g Protein | {Number(recipe.fat,0)}g Fat |{" "}
          {Number(recipe.carbs,0)}g Carbs
        </Text>
      </a>
    </Card>
  );
}
