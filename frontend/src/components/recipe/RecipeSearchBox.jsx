import React from "react";
import { Card, Inset, Text, Strong } from "@radix-ui/themes";

export default function RecipeSearchBox({
  title = "Undefined",
  description = "Undefined",
  nutrition = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  },
  id = "undefined",
  src = "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
}) {
  return (
    <Card asChild size="2" style={{ maxWidth: 260 }}>
      <a href={`recipes/${id}`}>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={src}
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
          <Strong>Typography</Strong>
        </Text>
        <Text>{description}</Text>
        <br />
        <Text size="2">{nutrition.calories} Calories</Text>
        <br />
        <Text size="2">
          {nutrition.protein}g Protein | {nutrition.fat}g Fat |{" "}
          {nutrition.carbs}g Carbs
        </Text>
      </a>
    </Card>
  );
}
