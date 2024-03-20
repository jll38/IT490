import React from "react";
import { Button, TextField, Heading } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
  
  export default function ShoppingList() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      ingredients: ["Pasta", "Eggs", "Parmesan Cheese", "Bacon"],
    },
    {
      id: 2,
      title: "Classic Pancakes",
      ingredients: ["Flour", "Eggs", "Milk", "Baking Powder", "Salt", "Sugar"],
    },
  ];
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [ingredients, setIngredients] = React.useState([]);

  const addValues = (valuesToAdd) => {
    setIngredients((ingredients) => [...ingredients, ...valuesToAdd]);
  };

  const removeValues = (valuesToRemove) => {
    setIngredients((currentArray) =>
      currentArray.filter((item) => !valuesToRemove.includes(item))
    );
  };

  return (
    <div className="pageContainer">
      <Heading>Shopping List Creator</Heading>
      <div
        style={{
          width: "100%",
          display: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField.Root className="w-[400px]">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </TextField.Root>
        <ul
          className={`bg-white border-2 ${
            searchTerm ? "absolute" : "hidden"
          } top-[140px]`}
        >
          {filteredRecipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "400px",
                alignItems: "center",
                padding: 4,
              }}
            >
              {recipe.title}{" "}
              <Button
                style={{ maxWidth: "50px" }}
                onClick={() => addValues(recipe.ingredients)}
              >
                +
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Shopping List</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
