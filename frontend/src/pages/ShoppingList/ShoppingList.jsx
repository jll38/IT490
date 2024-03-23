import React from "react";
import { Button, TextField, Heading } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function ShoppingList() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [trending, setTrending] = React.useState([]);
  const [ingredientsList, setIngredientsList] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/api/recipes/trending")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrending(data);
      });
  }, []);

  const filteredRecipes = trending.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [ingredients, setIngredients] = React.useState([]);

  const addValues = (recipe_id) => {
    fetch("http://localhost:8000/api/ingredients/recipe/" + recipe_id)
      .then((res) => res.json())
      .then((data) => {
        setIngredientsList((ingredientsList) => [...ingredientsList, ...data]);
        setSearchTerm("")
      });
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
              {recipe.recipe_name}{" "}
              <Button
                style={{ maxWidth: "50px" }}
                onClick={() => addValues(recipe.recipe_id)}
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
          {ingredientsList.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} {/* Adjusted to display the ingredient's name */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}
