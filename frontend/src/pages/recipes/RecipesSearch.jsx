import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeSearchBox from "../../components/recipe/RecipeSearchBox";
import {
  Grid,
  TextField,
  Text,
  Strong,
  Heading,
  Button,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import "./RecipesSearch.css";

export default function RecipesSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currLoadedTrending, setCurrLoadedTrending] = useState(0);

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  const js = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with creamy egg sauce.",
      src: "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg",
      nutrition: {
        calories: 475,
        protein: 23,
        fat: 10,
        carbs: 70,
      },
    },
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with creamy egg sauce.",
      src: "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg",
      nutrition: {
        calories: 475,
        protein: 23,
        fat: 10,
        carbs: 70,
      },
    },
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with creamy egg sauce.",
      src: "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg",
      nutrition: {
        calories: 475,
        protein: 23,
        fat: 10,
        carbs: 70,
      },
    },
    {
      id: 2,
      title: "Caesar Salad",
      description: "Crispy greens tossed with traditional Caesar dressing.",
      src: "data:image/jpeg;base64,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",
      nutrition: {
        calories: 350,
        protein: "12g",
        fat: "26g",
        carbs: "22g",
      },
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

  const fetchMoreRecipes = () => {
    console.log("Fetching more recipes...");
  }

  return (
    <div className="container-search" style={{ padding: "1rem 4rem" }}>
      <div className="relative">
        {" "}
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
        {searchTerm && (
          <div className="absolute border z-50 top-[60px] bg-white w-full">
            {" "}
            {filteredRecipes.map((recipe, i) => (
              <button onClick={() => {window.location.assign("/recipes/" + recipe.id)}} className="px-2 text-left flex items-center gap-4 border-b py-1">
                <img className="w-[50px] h-[50px] object-cover" src={recipe.src}></img>
                {recipe.title}
              </button>
            ))}
            <div>
              <Button variant="transparent" className="w-full" onClick={fetchMoreRecipes}>
                Load More
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="z-10">
        <Heading order={2} style={{ textAlign: "left", width: "100%" }}>
          Trending
        </Heading>
        <Grid
          width="100%"
          columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
          gap="3"
          align={"center"}
          justify={"center"}
          style={{ margin: "10px 0" }}
        >
          {js.map((recipe, i) => (
            <RecipeSearchBox
              recipe={recipe}
              key={"recipe-" + i} // Consider using a more stable key if possible
            />
          ))}
        </Grid>
        <Button onClick={() => {}} style={{ width: "100px" }}>
          Load More
        </Button>
      </div>

      <div>
        <Heading order={2} style={{ textAlign: "left", width: "100%" }}>
          Recently Posted
        </Heading>
        <Grid
          width="100%"
          columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
          gap="3"
          align={"center"}
          justify={"center"}
          style={{ margin: "10px 0" }}
        >
          {js.map((recipe, i) => (
            <RecipeSearchBox
              recipe={recipe}
              key={"recipe-" + i} // Consider using a more stable key if possible
            />
          ))}
        </Grid>
        <Button onClick={() => {}} style={{ width: "100px" }}>
          Load More
        </Button>
      </div>
    </div>
  );
}
