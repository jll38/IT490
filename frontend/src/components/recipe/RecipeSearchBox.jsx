import React from "react";
import { Card, Inset, Text, Strong } from "@radix-ui/themes";

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
          <Strong>{recipe.title}</Strong>
        </Text>
        <Text>{recipe.description}</Text>
        <br />
        <Text size="2">{recipe.nutrition.calories} Calories</Text>
        <br />
        <Text size="2">
          {recipe.nutrition.protein}g Protein | {recipe.nutrition.fat}g Fat |{" "}
          {recipe.nutrition.carbs}g Carbs
        </Text>
      </a>
    </Card>
  );
}
