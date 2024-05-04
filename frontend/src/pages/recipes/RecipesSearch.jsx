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
import { User } from "../../lib/token";
import { BACKEND } from "../../lib/constants";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./RecipesSearch.css";
import SearchBox from "../../components/recipe/RecipeSearchInput";

export default function RecipesSearch() {
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loadingRecommended, setRecommendedLoading] = useState(true);
  const [loadingTrending, setTrendingLoading] = useState(false);
  const [currLoadedTrending, setCurrLoadedTrending] = useState(0);
  useEffect(() => {
    fetch(`${BACKEND}/api/recipes/recommended/${User.username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecommended(data);
        setRecommendedLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`${BACKEND}/api/recipes/trending`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrending(data);
        setTrendingLoading(false);
      });
  }, []);

  const fetchMoreRecipes = () => {
    console.log("Fetching more recipes...");
  };

  return (
    <div className="container-search" style={{ padding: "1rem 4rem" }}>
      <SearchBox />
      <div className="z-10">
        <Heading order={2} style={{ textAlign: "left", width: "100%" }}>
          Recommended For You
        </Heading>
        <Heading
          order={3}
          style={{ textAlign: "left", width: "100%", fontSize: "75%" }}
          className="text-slate-700"
        >
          Based on your dietary preferences
        </Heading>
        {loadingRecommended ? (
          <div>loading</div>
        ) : (
          <>
            {recommended && (
              <Grid
                width="100%"
                columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
                gap="3"
                align={"center"}
                justify={"center"}
                style={{ margin: "10px 0" }}
              >
                {recommended.map((recipe, i) => (
                  <RecipeSearchBox recipe={recipe} key={"recipe-" + i} />
                ))}
              </Grid>
            )}
            <Button onClick={() => {}} style={{ width: "100px" }}>
              Load More
            </Button>
          </>
        )}
      </div>
      <div className="z-10">
        <Heading order={2} style={{ textAlign: "left", width: "100%" }}>
          Trending
        </Heading>
       {loadingTrending ? <div>Loading...</div> : <>
          {trending && (
            <Grid
              width="100%"
              columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
              gap="3"
              align={"center"}
              justify={"center"}
              style={{ margin: "10px 0" }}
            >
              {trending.map((recipe, i) => (
                <RecipeSearchBox recipe={recipe} key={"recipe-" + i} />
              ))}
            </Grid>
          )}
          <Button onClick={() => {}} style={{ width: "100px" }}>
            Load More
          </Button>
        </>}
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
        ></Grid>
        <Button onClick={() => {}} style={{ width: "100px" }}>
          Load More
        </Button>
      </div>
    </div>
  );
}
