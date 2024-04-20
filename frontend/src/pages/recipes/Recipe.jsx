import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../../components/shared/StarRating/StarRating";

import { BACKEND } from "../../lib/constants";
export default function Recipe() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState({
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    veryHealthy: true,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    lowFodmap: false,
    weightWatcherSmartPoints: 23,
    gaps: "no",
    preparationMinutes: -1,
    cookingMinutes: -1,
    aggregateLikes: 35,
    healthScore: 100,
    creditsText: "Lisa's Vegetarian Kitchen",
    license: "CC BY 2.5 CA",
    sourceName: "Food and Spice",
    pricePerServing: 161.03,
    id: 766453,
    title: "Hummus and Za'atar",
    readyInMinutes: 45,
    nutrition: {
      nutrients: [
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
        { name: "Calories", amount: 100 },
      ],
    },
    servings: 4,
    sourceUrl:
      "http://foodandspice.blogspot.com/2016/03/hummus-with-zaatar.html",
    image: "https://img.spoonacular.com/recipes/766453-312x231.jpg",
    imageType: "jpg",
    summary:
      'You can never have too many middl eastern recipes, so give Hummus and Za\'atar a try. This recipe serves 4. One portion of this dish contains about <b>34g of protein</b>, <b>31g of fat</b>, and a total of <b>778 calories</b>. For <b>$1.61 per serving</b>, this recipe <b>covers 44%</b> of your daily requirements of vitamins and minerals. If you have chickpeas, olive oil, sea salt, and a few other ingredients on hand, you can make it. It works best as a marinade, and is done in about <b>45 minutes</b>. It is a good option if you\'re following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. 35 people have made this recipe and would make it again. It is brought to you by foodandspice.blogspot.com. Overall, this recipe earns a <b>great spoonacular score of 98%</b>. <a href="https://spoonacular.com/recipes/chopped-hummus-dip-with-zaatar-180958">Chopped Hummus Dip with Za\'atar</a>, <a href="https://spoonacular.com/recipes/mediterranean-hummus-toast-with-zaatar-1067472">Mediterranean Hummus Toast with Za’atar</a>, and <a href="https://spoonacular.com/recipes/hummus-deviled-eggs-with-zaatar-exercise-challenge-1195539">Hummus Deviled Eggs with Za’atar {Exercise Challenge}</a> are very similar to this recipe.',
    cuisines: ["Middle Eastern"],
    dishTypes: ["seasoning", "marinade"],
    diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
    occasions: [],
    spoonacularScore: 98.62712860107422,
    spoonacularSourceUrl: "https://spoonacular.com/hummus-and-zaatar-766453",
    reviews: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(`${BACKEND}/api/recipes/${id}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setRecipe(data);
  //       setIsLoading(false);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     });
  // }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md max-h-[300px] h-auto rounded-lg object-fill"
      />
      <p>Serves: {recipe.servings}</p>
      <StarRating
        editable={false}
        level={recipe.average_rating}
        recipe={recipe}
      />
      <StarRating editable={true} level={5} recipe={recipe} />
      <h2 className="text-2xl font-bold mt-6 mb-2">Summary</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Instructions</h2>
      <p className="mt-4">{recipe.instructions}</p>
      <h2 className="text-2xl font-bold mt-6 mb-2">Nutrition Facts</h2>
      <ul>
        <li>
          {recipe.nutrition.nutrients[0].name}:{" "}
          {Math.ceil(recipe.nutrition.nutrients[0].amount)}
        </li>
        <li>
          {recipe.nutrition.nutrients[8].name}:{" "}
          {Math.floor(recipe.nutrition.nutrients[8].amount)}g
        </li>
        <li>
          {recipe.nutrition.nutrients[3].name}:{" "}
          {Math.floor(recipe.nutrition.nutrients[3].amount)}g
        </li>
        <li>
          {recipe.nutrition.nutrients[1].name}:{" "}
          {Math.floor(recipe.nutrition.nutrients[1].amount)}g
        </li>
      </ul>
    </div>
  );
}
