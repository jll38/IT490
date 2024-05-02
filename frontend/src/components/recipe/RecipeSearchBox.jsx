import React from "react";
import { Card, Inset, Text, Strong } from "@radix-ui/themes";
import StarRating from "../shared/StarRating/StarRating";
import Badge from "../badge/Badge.jsx";
import "./truncate.css";
export default function RecipeSearchBox({ recipe }) {
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
  return (
    <Card asChild size="2" style={{ width: 300, maxHeight: 340 }}>
      <a href={`recipes/${recipe.id}`}>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={recipe.image}
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
        <StarRating
          editable={false}
          level={Number(recipe.average_rating)}
          recipe={recipe}
        />
        {recipe.preparationMinutes > 0 && (
          <>
            <Text className="text-gray-700">
              Prep Time: {recipe.preparationMinutes} Minutes
            </Text>
            <br />
          </>
        )}

        <Text
          className="truncate-overflow"
          size="2"
          dangerouslySetInnerHTML={{
            __html: truncateText(recipe.summary, 100),
          }}
        ></Text>
      </a>
    </Card>
  );
}
