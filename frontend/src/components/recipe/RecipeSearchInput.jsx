// components/SearchBox.js
import React, { useState, useEffect } from "react";
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { BACKEND } from "../../lib/constants";
import { useDebounce } from "../../hooks/useDebounce";
import { User } from "../../lib/token";

function SearchBox({
  onResults = (e) => {
    console.log(e);
  },
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetchRecipes(debouncedSearchTerm);
  }, [debouncedSearchTerm, filterActive]);

  const fetchRecipes = async (query) => {
    const url = `${BACKEND}/api/recipes/?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (filterActive) {
        const filteredData = data.filter(recipe => 
          recipe.diets.some(diet => User.dietary_restrictions.includes(diet))
        );
        setResults(filteredData);
        onResults(filteredData);
      } else {
        setResults(data);
        onResults(data);
      }
    } else {
      console.error("Failed to fetch recipes");
      onResults([]); // Handle error state appropriately
    }
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
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
      <Button className="ml-2" onClick={toggleFilter}>
        {filterActive ? 'Disable Filter' : 'Enable Filter'}
      </Button>
      {searchTerm && (
        <div className="absolute border z-50 top-[60px] bg-white w-full">
          {results.map((recipe, i) => (
            <button
              key={recipe.id}
              onClick={() => {
                window.location.assign("/recipes/" + recipe.id);
              }}
              className="px-2 text-left flex items-center gap-4 border-b py-1"
            >
              <img
                className="w-[50px] h-[50px] object-cover"
                src={recipe.image}
                alt={recipe.title}
              />
              <div>
                <div>{recipe.title}</div>
                <div className="text-xs text-gray-700">
                  {recipe.preparationMinutes > 0 &&
                    `${recipe.preparationMinutes} Minutes`}
                  {filterActive && recipe.diets.map((diet, index) => {
                    if (User.dietary_restrictions.includes(diet))
                      return (
                        <div
                          key={index}
                          className="bg-green-500 text-white p-1 rounded-md grid place-items-center"
                        >
                          {diet}
                        </div>
                      );
                  })}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
