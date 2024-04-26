import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { BACKEND } from "../../lib/constants";

function SearchBoxShoppingList({ onRecipeSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchRecipes(debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const fetchRecipes = async (query) => {
    const response = await fetch(`${BACKEND}/api/recipes/?query=${encodeURIComponent(query)}`);
    if (response.ok) {
      const data = await response.json();
      setResults(data);
    } else {
      console.error("Failed to fetch recipes");
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        placeholder="Search for recipes..."
        value={searchTerm}
        className={"w-full h-[40px] border-2 px-2 border-gray-300 rounded-lg"}
        onChange={(e) => setSearchTerm(e.target.value)}
        width="400px"
      />
      {searchTerm && results.length > 0 && (
        <div className="absolute border z-50 top-[60px] bg-white w-full">
          {results.map((recipe) => (
            <button
              key={recipe.id}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link navigation
                setSearchTerm("")
                onRecipeSelect(recipe.id); // Trigger the fetch for ingredients
              }}
              className="px-2 text-left flex items-center gap-4 border-b py-1"
            >
              <img className="w-[50px] h-[50px] object-cover" src={recipe.image} alt="" />
              <div>
                <div>{recipe.title}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBoxShoppingList;
