// components/SearchBox.js
import React, { useState, useEffect } from "react";
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { BACKEND } from "../../lib/constants";
import { useDebounce } from "../../hooks/useDebounce";
import { Button } from "@radix-ui/themes";
function SearchBox({
  onResults = (e) => {
    console.log(e);
  },
}) {
  const user = { name: "Julian", diet: ["vegan", "halal"] };
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchRecipes(debouncedSearchTerm);
    } else {
      onResults([]); // Clear results when input is cleared
    }
  }, [debouncedSearchTerm]);

  const fetchRecipes = async (query) => {
    const response = await fetch(
      `${BACKEND}/api/recipes/?query=${encodeURIComponent(query)}`
    );
    if (response.ok) {
      const data = await response.json();
      setResults(data);
      onResults(data); // Pass the data to the parent component or handle it here
    } else {
      console.error("Failed to fetch recipes");
      onResults([]); // Handle error state appropriately
    }
  };

  return (
    <div className="relative">
      <TextField.Root className="w-[400px]">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TextField.Root>
      {searchTerm && (
        <div className="absolute border z-50 top-[60px] bg-white w-full">
          {" "}
          {results.map((recipe, i) => {
            return (
              <button
                onClick={() => {
                  window.location.assign("/recipes/" + recipe.id);
                }}
                className="px-2 text-left flex items-center gap-4 border-b py-1"
              >
                <img
                  className="w-[50px] h-[50px] object-cover"
                  src={recipe.image}
                ></img>
                <div>
                  <div>{recipe.title}</div>
                  <div className="text-xs text-gray-700">
                    {recipe.preparationMinutes > 0 &&
                      recipe.preparationMinutes + " Minutes"}
                    {recipe.diets.map((diet, i) => {
                      if (user.diet.includes(diet))
                        return (
                          <div
                            className={"bg-green-500 text-white p-1 rounded-md grid place-items-center"}
                          >
                            {diet}
                          </div>
                        );
                    })}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
