import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeSearchBox from "../../components/recipe/RecipeSearchBox";
import { Grid, TextField, Text, Strong } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import "./RecipesSearch.css";

export default function RecipesSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  const js = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with creamy egg sauce.",
      src: "/images/spaghetti-carbonara.jpg",
      nutrition: {
        calories: 475,
        protein: "23g",
        fat: "10g",
        carbs: "70g"
      }
    },
    {
      id: 2,
      title: "Caesar Salad",
      description: "Crispy greens tossed with traditional Caesar dressing.",
      src: "/images/caesar-salad.jpg",
      nutrition: {
        calories: 350,
        protein: "12g",
        fat: "26g",
        carbs: "22g"
      }
    },
    // Add more recipe objects as needed
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
            recipe={recipe}
            key={"recipe-" + i} // Consider using a more stable key if possible
          />
        ))}
      </Grid>
    </div>
  );
}
