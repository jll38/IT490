import React from "react";
import { BACKEND } from "../../lib/constants";
import SearchBoxShoppingList from "../../components/recipe/RecipeSearchInputShoppingList";
import { Button } from "@radix-ui/themes";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";

import { ShoppingListPDF } from "./ShoppingListPDF";
import { User } from "../../lib/token";
export default function ShoppingList() {
  const [ingredientsList, setIngredientsList] = React.useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const addValues = (recipe_id) => {
    fetch(`${BACKEND}/api/ingredients/recipe/` + recipe_id)
      .then((res) => res.json())
      .then((data) => {
        setIngredientsList((prev) => [...prev, ...data]);
      });
  };

  const onIngredientClick = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((name) => name !== ingredientName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  return (
    <div className="pageContainer flex justify-center w-full p-12">
      <div className="max-w-[1000px] w-[100%]">
        <h1 className="text-center font-bold text-2xl">
          Shopping List Creator
        </h1>
        <SearchBoxShoppingList onRecipeSelect={addValues} />
        <Button
          onClick={() => {
            setIngredientsList([]);
            setSelectedIngredients([]);
          }}
        >
          Clear Shopping List
        </Button>
        <hr className="my-[20px]" />
        {ingredientsList.length > 0 && (
          <PDFDownloadLink
            document={
              <ShoppingListPDF
                user={User.username}
                list={ingredientsList || []}
              />
            }
            fileName={`${formattedDate} Shopping List - Nutripal.pdf`}
            className="bg-gray-300 hover:bg-gray-200"
            style={{
              margin: "10px",
              padding: "10px 10px",
              borderRadius: "10px",
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "PDF Export"
            }
          </PDFDownloadLink>
        )}
        <div className="mt-10">
          <ul className="flex flex-col gap-2">
            {ingredientsList.map((ingredient, index) => (
              <li
                className={`cursor-pointer rounded-md p-2 max-w-[400px] ${
                  selectedIngredients.includes(ingredient.name)
                    ? "bg-green-200"
                    : "bg-gray-200"
                }`}
                key={index}
                onClick={() => onIngredientClick(ingredient.name)}
              >
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
