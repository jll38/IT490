import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeSearchBox from "../../components/recipe/RecipeSearchBox";
import { Grid, TextField, Text, Strong } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import "./RecipesSearch.css";

export default function RecipesSearch() {
  const { id } = useParams(); // Assuming you'll use this for something specific later
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  const js = [
    {
      title: "test",
      description: "test description",
      nutrition: { calories: 240, protein: 10, fat: 20, carbs: 30 },
    },
    {
      title: "test",
      description: "test description",
      nutrition: { calories: 240, protein: 10, fat: 20, carbs: 30 },
    },
    {
      title: "test",
      description: "test description",
      nutrition: { calories: 240, protein: 10, fat: 20, carbs: 30 },
    },
    {
      title: "test",
      description: "test description",
      nutrition: { calories: 240, protein: 10, fat: 20, carbs: 30 },
    },
    {
      title: "test",
      description: "test description",
      nutrition: { calories: 240, protein: 10, fat: 20, carbs: 30 },
    },
  ];

  // Filter recipes based on searchTerm
  const filteredRecipes = js.filter((recipe) => {
    return (
      searchTerm === "" ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container-search">
      <Text size={"5"}>
        <Strong>Recipe Search</Strong>
      </Text>
      <TextField.Root className="w-[400px]">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Butter Chicken"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TextField.Root>
      <Grid
        width="100%"
        columns={{ initial: "1", sm: "4" }}
        gap="3"
        align={"center"}
        justify={"center"}
      >
        {filteredRecipes.map((recipe, i) => (
          <RecipeSearchBox
            title={recipe.title}
            description={recipe.description}
            nutrition={recipe.nutrition}
            key={"recipe-" + i} // Consider using a more stable key if possible
          />
        ))}
      </Grid>
    </div>
  );
}
