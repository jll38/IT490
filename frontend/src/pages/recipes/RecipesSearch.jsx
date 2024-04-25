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

import { BACKEND } from "../../lib/constants";

import "./RecipesSearch.css";
import SearchBox from "../../components/recipe/RecipeSearchInput";

export default function RecipesSearch() {
  const [trending, setTrending] = useState([]);
  const [currLoadedTrending, setCurrLoadedTrending] = useState(0);

  useEffect(() => {
    // fetch(`${BACKEND}/api/recipes/trending`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setTrending(data);
    //   });
    setTrending([
    {
        "vegetarian": true,
        "vegan": true,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 12,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 309,
        "healthScore": 100,
        "creditsText": "blogspot.com",
        "sourceName": "blogspot.com",
        "pricePerServing": 134.63,
        "id": 782585,
        "title": "Cannellini Bean and Asparagus Salad with Mushrooms",
        "readyInMinutes": 45,
        "servings": 6,
        "sourceUrl": "http://foodandspice.blogspot.com/2016/05/cannellini-bean-and-asparagus-salad.html",
        "image": "https://img.spoonacular.com/recipes/782585-312x231.jpg",
        "imageType": "jpg",
        "summary": "Cannellini Bean and Asparagus Salad with Mushrooms requires approximately <b>45 minutes</b> from start to finish. This main course has <b>482 calories</b>, <b>31g of protein</b>, and <b>6g of fat</b> per serving. This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe serves 6 and costs <b>$1.35 per serving</b>. 309 people were impressed by this recipe. Head to the store and pick up grain mustard, sea salt, lemon zest, and a few other things to make it today. It is brought to you by foodandspice.blogspot.com. Taking all factors into account, this recipe <b>earns a spoonacular score of 70%</b>, which is pretty good. Similar recipes are <a href=\"https://spoonacular.com/recipes/cannellini-bean-salad-422994\">Cannellini Bean Salad</a>, <a href=\"https://spoonacular.com/recipes/refreshing-cannellini-bean-salad-113127\">Refreshing Cannellini Bean Salad</a>, and <a href=\"https://spoonacular.com/recipes/cannellini-and-green-bean-salad-33177\">Cannellini-and-Green Bean Salad</a>.",
        "cuisines": [],
        "dishTypes": [
            "side dish",
            "lunch",
            "main course",
            "salad",
            "main dish",
            "dinner"
        ],
        "diets": [
            "gluten free",
            "dairy free",
            "lacto ovo vegetarian",
            "vegan"
        ],
        "occasions": [],
        "spoonacularScore": 99.5428237915039,
        "spoonacularSourceUrl": "https://spoonacular.com/cannellini-bean-and-asparagus-salad-with-mushrooms-782585",
        "reviews": []
    },
    {
        "vegetarian": true,
        "vegan": false,
        "glutenFree": false,
        "dairyFree": false,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": true,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 15,
        "gaps": "no",
        "preparationMinutes": 5,
        "cookingMinutes": 0,
        "aggregateLikes": 689,
        "healthScore": 64,
        "creditsText": "Jen West",
        "sourceName": "Pink When",
        "pricePerServing": 206.79,
        "id": 715497,
        "title": "Berry Banana Breakfast Smoothie",
        "readyInMinutes": 5,
        "servings": 1,
        "sourceUrl": "http://www.pinkwhen.com/berry-banana-breakfast-smoothie/",
        "image": "https://img.spoonacular.com/recipes/715497-312x231.jpg",
        "imageType": "jpg",
        "summary": "If you want to add more <b>lacto ovo vegetarian</b> recipes to your recipe box, Berry Banana Breakfast Smoothie might be a recipe you should try. One portion of this dish contains about <b>21g of protein</b>, <b>10g of fat</b>, and a total of <b>457 calories</b>. This recipe serves 1 and costs $2.07 per serving. 689 people have tried and liked this recipe. It works well as a rather inexpensive breakfast. A mixture of banana, graham cracker crumbs, vanilla yogurt, and a handful of other ingredients are all it takes to make this recipe so yummy. From preparation to the plate, this recipe takes roughly <b>5 minutes</b>. It is brought to you by Pink When. Overall, this recipe earns a <b>super spoonacular score of 99%</b>. Similar recipes include <a href=\"https://spoonacular.com/recipes/berry-banana-breakfast-smoothie-1364145\">Berry Banana Breakfast Smoothie</a>, <a href=\"https://spoonacular.com/recipes/berry-banana-breakfast-smoothie-1405583\">Berry Banana Breakfast Smoothie</a>, and <a href=\"https://spoonacular.com/recipes/berry-banana-breakfast-smoothie-1601311\">Berry Banana Breakfast Smoothie</a>.",
        "cuisines": [],
        "dishTypes": [
            "morning meal",
            "brunch",
            "beverage",
            "breakfast",
            "drink"
        ],
        "diets": [
            "lacto ovo vegetarian"
        ],
        "occasions": [],
        "spoonacularScore": 99.47085571289062,
        "spoonacularSourceUrl": "https://spoonacular.com/berry-banana-breakfast-smoothie-715497",
        "reviews": []
    },
    {
        "vegetarian": false,
        "vegan": false,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": true,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 11,
        "gaps": "no",
        "preparationMinutes": 10,
        "cookingMinutes": 45,
        "aggregateLikes": 1866,
        "healthScore": 100,
        "creditsText": "pinkwhen.com",
        "sourceName": "pinkwhen.com",
        "pricePerServing": 300.45,
        "id": 715415,
        "title": "Red Lentil Soup with Chicken and Turnips",
        "readyInMinutes": 55,
        "servings": 8,
        "sourceUrl": "http://www.pinkwhen.com/red-lentil-soup-with-chicken-and-turnips/",
        "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        "imageType": "jpg",
        "summary": "Red Lentil Soup with Chicken and Turnips might be a good recipe to expand your main course repertoire. This recipe serves 8 and costs $3.0 per serving. One serving contains <b>477 calories</b>, <b>27g of protein</b>, and <b>20g of fat</b>. It is brought to you by Pink When. 1866 people have tried and liked this recipe. It can be enjoyed any time, but it is especially good for <b>Autumn</b>. From preparation to the plate, this recipe takes approximately <b>55 minutes</b>. It is a good option if you're following a <b>gluten free and dairy free</b> diet. Head to the store and pick up salt and pepper, canned tomatoes, flat leaf parsley, and a few other things to make it today. Overall, this recipe earns a <b>spectacular spoonacular score of 99%</b>. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/red-lentil-and-chicken-soup-682185\">Red Lentil and Chicken Soup</a>, <a href=\"https://spoonacular.com/recipes/red-lentil-and-chicken-soup-1058971\">Red Lentil and Chicken Soup</a>, and <a href=\"https://spoonacular.com/recipes/red-lentil-soup-34121\">Red-Lentil Soup</a>.",
        "cuisines": [],
        "dishTypes": [
            "lunch",
            "soup",
            "main course",
            "main dish",
            "dinner"
        ],
        "diets": [
            "gluten free",
            "dairy free"
        ],
        "occasions": [
            "fall",
            "winter"
        ],
        "spoonacularScore": 99.41333770751953,
        "spoonacularSourceUrl": "https://spoonacular.com/red-lentil-soup-with-chicken-and-turnips-715415",
        "reviews": []
    },
    {
        "vegetarian": true,
        "vegan": true,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 2,
        "gaps": "GAPS_4",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 207,
        "healthScore": 100,
        "creditsText": "Full Belly Sisters",
        "license": "CC BY-SA 3.0",
        "sourceName": "Full Belly Sisters",
        "pricePerServing": 178.37,
        "id": 716406,
        "title": "Asparagus and Pea Soup: Real Convenience Food",
        "readyInMinutes": 20,
        "servings": 2,
        "sourceUrl": "http://fullbellysisters.blogspot.com/2011/03/asparagus-and-pea-soup-real-convenience.html",
        "image": "https://img.spoonacular.com/recipes/716406-312x231.jpg",
        "imageType": "jpg",
        "summary": "Asparagus and Pea Soup: Real Convenience Food requires approximately <b>20 minutes</b> from start to finish. Watching your figure? This gluten free, dairy free, paleolithic, and lacto ovo vegetarian recipe has <b>217 calories</b>, <b>11g of protein</b>, and <b>8g of fat</b> per serving. This recipe serves 2. For <b>$1.78 per serving</b>, this recipe <b>covers 25%</b> of your daily requirements of vitamins and minerals. <b>Autumn</b> will be even more special with this recipe. It works well as a hor d'oeuvre. 207 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. A mixture of vegetable broth, evoo, garlic, and a handful of other ingredients are all it takes to make this recipe so yummy. All things considered, we decided this recipe <b>deserves a spoonacular score of 96%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/asparagus-and-pea-soup-real-convenience-food-1393979\">Asparagus and Pea Soup: Real Convenience Food</a>, <a href=\"https://spoonacular.com/recipes/asparagus-and-pea-soup-real-convenience-food-1376201\">Asparagus and Pea Soup: Real Convenience Food</a>, and <a href=\"https://spoonacular.com/recipes/asparagus-and-pea-soup-real-convenience-food-1362341\">Asparagus and Pea Soup: Real Convenience Food</a> for similar recipes.",
        "cuisines": [],
        "dishTypes": [
            "antipasti",
            "soup",
            "starter",
            "snack",
            "appetizer",
            "antipasto",
            "hor d'oeuvre"
        ],
        "diets": [
            "gluten free",
            "dairy free",
            "paleolithic",
            "lacto ovo vegetarian",
            "primal",
            "vegan"
        ],
        "occasions": [
            "fall",
            "winter"
        ],
        "spoonacularScore": 99.40194702148438,
        "spoonacularSourceUrl": "https://spoonacular.com/asparagus-and-pea-soup-real-convenience-food-716406",
        "reviews": []
    },
    {
        "vegetarian": true,
        "vegan": true,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 5,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 19,
        "healthScore": 83,
        "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
        "license": "CC BY 3.0",
        "sourceName": "Foodista",
        "pricePerServing": 69.09,
        "id": 644387,
        "title": "Garlicky Kale",
        "readyInMinutes": 45,
        "servings": 2,
        "sourceUrl": "http://www.foodista.com/recipe/J2FTJBF7/garlicky-kale",
        "image": "https://img.spoonacular.com/recipes/644387-312x231.jpg",
        "imageType": "jpg",
        "summary": "Garlicky Kale requires approximately <b>45 minutes</b> from start to finish. This side dish has <b>170 calories</b>, <b>2g of protein</b>, and <b>15g of fat</b> per serving. This recipe serves 2. For <b>69 cents per serving</b>, this recipe <b>covers 17%</b> of your daily requirements of vitamins and minerals. 19 people have made this recipe and would make it again. This recipe from Foodista requires balsamic vinegar, garlic, curly kale, and olive oil. It is a good option if you're following a <b>gluten free, dairy free, paleolithic, and lacto ovo vegetarian</b> diet. With a spoonacular <b>score of 99%</b>, this dish is outstanding. Try <a href=\"https://spoonacular.com/recipes/garlicky-kale-248759\">Garlicky Kale</a>, <a href=\"https://spoonacular.com/recipes/garlicky-kale-1267347\">Garlicky Kale</a>, and <a href=\"https://spoonacular.com/recipes/garlicky-kale-1584523\">Garlicky Kale</a> for similar recipes.",
        "cuisines": [],
        "dishTypes": [
            "side dish"
        ],
        "diets": [
            "gluten free",
            "dairy free",
            "paleolithic",
            "lacto ovo vegetarian",
            "primal",
            "whole 30",
            "vegan"
        ],
        "occasions": [],
        "spoonacularScore": 98.91131591796875,
        "spoonacularSourceUrl": "https://spoonacular.com/garlicky-kale-644387",
        "reviews": []
    },
    {
        "vegetarian": false,
        "vegan": false,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 10,
        "gaps": "no",
        "preparationMinutes": 10,
        "cookingMinutes": 480,
        "aggregateLikes": 57,
        "healthScore": 100,
        "creditsText": "pinkwhen.com",
        "sourceName": "pinkwhen.com",
        "pricePerServing": 270.41,
        "id": 715446,
        "title": "Slow Cooker Beef Stew",
        "readyInMinutes": 490,
        "servings": 6,
        "sourceUrl": "http://www.pinkwhen.com/slow-cooker-beef-stew-recipe/",
        "image": "https://img.spoonacular.com/recipes/715446-312x231.jpg",
        "imageType": "jpg",
        "summary": "If you want to add more <b>gluten free and dairy free</b> recipes to your recipe box, Slow Cooker Beef Stew might be a recipe you should try. One serving contains <b>434 calories</b>, <b>44g of protein</b>, and <b>12g of fat</b>. This recipe serves 6. For <b>$2.7 per serving</b>, this recipe <b>covers 45%</b> of your daily requirements of vitamins and minerals. It works best as a main course, and is done in approximately <b>8 hours and 10 minutes</b>. If you have green onions, carrots, celery, and a few other ingredients on hand, you can make it. This recipe is liked by 57 foodies and cooks. <b>Autumn</b> will be even more special with this recipe. It is brought to you by Pink When. Taking all factors into account, this recipe <b>earns a spoonacular score of 99%</b>, which is awesome. Similar recipes include <a href=\"https://spoonacular.com/recipes/slow-cooker-beef-stew-1578321\">Slow Cooker Beef Stew</a>, <a href=\"https://spoonacular.com/recipes/slow-cooker-beef-stew-1241707\">Slow Cooker Beef Stew</a>, and <a href=\"https://spoonacular.com/recipes/slow-cooker-beef-stew-1281171\">Slow Cooker Beef Stew</a>.",
        "cuisines": [],
        "dishTypes": [
            "lunch",
            "soup",
            "main course",
            "main dish",
            "dinner"
        ],
        "diets": [
            "gluten free",
            "dairy free"
        ],
        "occasions": [
            "fall",
            "winter"
        ],
        "spoonacularScore": 98.8117904663086,
        "spoonacularSourceUrl": "https://spoonacular.com/slow-cooker-beef-stew-715446",
        "reviews": []
    },
    {
        "vegetarian": true,
        "vegan": true,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 9,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 53,
        "healthScore": 96,
        "creditsText": "blogspot.com",
        "sourceName": "blogspot.com",
        "pricePerServing": 168.43,
        "id": 782601,
        "title": "Red Kidney Bean Jambalaya",
        "readyInMinutes": 45,
        "servings": 6,
        "sourceUrl": "http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html",
        "image": "https://img.spoonacular.com/recipes/782601-312x231.jpg",
        "imageType": "jpg",
        "summary": "Red Kidney Bean Jambalayan is a main course that serves 6. One portion of this dish contains approximately <b>18g of protein</b>, <b>6g of fat</b>, and a total of <b>393 calories</b>. For <b>$1.68 per serving</b>, this recipe <b>covers 33%</b> of your daily requirements of vitamins and minerals. 53 people were glad they tried this recipe. A mixture of vegetable stock, tomatoes, onion, and a handful of other ingredients are all it takes to make this recipe so flavorful. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. This recipe is typical of Cajun cuisine. It is brought to you by foodandspice.blogspot.com. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. Overall, this recipe earns a <b>tremendous spoonacular score of 99%</b>. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/red-kidney-bean-jambalaya-1407231\">Red Kidney Bean Jambalaya</a>, <a href=\"https://spoonacular.com/recipes/red-kidney-bean-salad-94525\">Red Kidney Bean Salad</a>, and <a href=\"https://spoonacular.com/recipes/red-kidney-bean-curry-80686\">Red Kidney Bean Curry</a>.",
        "cuisines": [
            "Creole",
            "Cajun"
        ],
        "dishTypes": [
            "lunch",
            "main course",
            "main dish",
            "dinner"
        ],
        "diets": [
            "gluten free",
            "dairy free",
            "lacto ovo vegetarian",
            "vegan"
        ],
        "occasions": [],
        "spoonacularScore": 98.78032684326172,
        "spoonacularSourceUrl": "https://spoonacular.com/red-kidney-bean-jambalaya-782601",
        "reviews": []
    },
    {
        "vegetarian": false,
        "vegan": false,
        "glutenFree": true,
        "dairyFree": false,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 12,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 159,
        "healthScore": 85,
        "creditsText": "pinkwhen.com",
        "sourceName": "pinkwhen.com",
        "pricePerServing": 435.16,
        "id": 795751,
        "title": "Chicken Fajita Stuffed Bell Pepper",
        "readyInMinutes": 45,
        "servings": 3,
        "sourceUrl": "http://www.pinkwhen.com/chicken-fajita-stuffed-bell-pepper/",
        "image": "https://img.spoonacular.com/recipes/795751-312x231.jpg",
        "imageType": "jpg",
        "summary": "Chicken Fajita Stuffed Bell Pepper takes approximately <b>45 minutes</b> from beginning to end. Watching your figure? This gluten free recipe has <b>526 calories</b>, <b>50g of protein</b>, and <b>24g of fat</b> per serving. For <b>$4.35 per serving</b>, you get a main course that serves 3. 159 people have made this recipe and would make it again. This recipe is typical of Mexican cuisine. This recipe from Pink When requires cumin, cilantro, salsa, and chili powder. All things considered, we decided this recipe <b>deserves a spoonacular score of 98%</b>. This score is amazing. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/stuffed-bell-peppers-551310\">Stuffed Bell Peppers</a>, <a href=\"https://spoonacular.com/recipes/stuffed-bell-pepper-1348405\">Stuffed Bell Pepper</a>, and <a href=\"https://spoonacular.com/recipes/stuffed-bell-pepper-526845\">Stuffed Bell Pepper</a>.",
        "cuisines": [
            "Mexican"
        ],
        "dishTypes": [
            "lunch",
            "main course",
            "main dish",
            "dinner"
        ],
        "diets": [
            "gluten free"
        ],
        "occasions": [],
        "spoonacularScore": 98.76217651367188,
        "spoonacularSourceUrl": "https://spoonacular.com/chicken-fajita-stuffed-bell-pepper-795751",
        "reviews": []
    },
    {
        "vegetarian": true,
        "vegan": true,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": false,
        "cheap": false,
        "veryPopular": true,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 7,
        "gaps": "no",
        "preparationMinutes": 15,
        "cookingMinutes": 15,
        "aggregateLikes": 3689,
        "healthScore": 51,
        "creditsText": "Full Belly Sisters",
        "license": "CC BY-SA 3.0",
        "sourceName": "Full Belly Sisters",
        "pricePerServing": 119.36,
        "id": 716426,
        "title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        "readyInMinutes": 30,
        "servings": 8,
        "sourceUrl": "http://fullbellysisters.blogspot.com/2012/01/cauliflower-fried-rice-more-veggies.html",
        "image": "https://img.spoonacular.com/recipes/716426-312x231.jpg",
        "imageType": "jpg",
        "summary": "The recipe Cauliflower, Brown Rice, and Vegetable Fried Rice is ready <b>in around 30 minutes</b> and is definitely a great <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> option for lovers of Chinese food. This recipe makes 8 servings with <b>248 calories</b>, <b>7g of protein</b>, and <b>13g of fat</b> each. For <b>$1.19 per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. It works well as a hor d'oeuvre. 3689 people have made this recipe and would make it again. It is brought to you by fullbellysisters.blogspot.com. Head to the store and pick up broccoli, t grapeseed oil, sesame seeds, and a few other things to make it today. With a spoonacular <b>score of 100%</b>, this dish is amazing. <a href=\"https://spoonacular.com/recipes/cauliflower-brown-rice-and-vegetable-fried-rice-1230097\">Cauliflower, Brown Rice, and Vegetable Fried Rice</a>, <a href=\"https://spoonacular.com/recipes/cauliflower-brown-rice-and-vegetable-fried-rice-1238897\">Cauliflower, Brown Rice, and Vegetable Fried Rice</a>, and <a href=\"https://spoonacular.com/recipes/cauliflower-brown-rice-and-vegetable-fried-rice-1403527\">Cauliflower, Brown Rice, and Vegetable Fried Rice</a> are very similar to this recipe.",
        "cuisines": [
            "Chinese",
            "Asian"
        ],
        "dishTypes": [
            "side dish",
            "antipasti",
            "starter",
            "snack",
            "appetizer",
            "antipasto",
            "hor d'oeuvre"
        ],
        "diets": [
            "gluten free",
            "dairy free",
            "lacto ovo vegetarian",
            "vegan"
        ],
        "occasions": [],
        "spoonacularScore": 98.6746826171875,
        "spoonacularSourceUrl": "https://spoonacular.com/cauliflower-brown-rice-and-vegetable-fried-rice-716426",
        "reviews": []
    },
    {
        "vegetarian": true,
        "vegan": true,
        "glutenFree": true,
        "dairyFree": true,
        "veryHealthy": true,
        "cheap": false,
        "veryPopular": false,
        "sustainable": false,
        "lowFodmap": false,
        "weightWatcherSmartPoints": 23,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 35,
        "healthScore": 100,
        "creditsText": "Lisa's Vegetarian Kitchen",
        "license": "CC BY 2.5 CA",
        "sourceName": "Food and Spice",
        "pricePerServing": 161.03,
        "id": 766453,
        "title": "Hummus and Za'atar",
        "readyInMinutes": 45,
        "servings": 4,
        "sourceUrl": "http://foodandspice.blogspot.com/2016/03/hummus-with-zaatar.html",
        "image": "https://img.spoonacular.com/recipes/766453-312x231.jpg",
        "imageType": "jpg",
        "summary": "You can never have too many middl eastern recipes, so give Hummus and Za'atar a try. This recipe serves 4. One portion of this dish contains about <b>34g of protein</b>, <b>31g of fat</b>, and a total of <b>778 calories</b>. For <b>$1.61 per serving</b>, this recipe <b>covers 44%</b> of your daily requirements of vitamins and minerals. If you have chickpeas, olive oil, sea salt, and a few other ingredients on hand, you can make it. It works best as a marinade, and is done in about <b>45 minutes</b>. It is a good option if you're following a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan</b> diet. 35 people have made this recipe and would make it again. It is brought to you by foodandspice.blogspot.com. Overall, this recipe earns a <b>great spoonacular score of 98%</b>. <a href=\"https://spoonacular.com/recipes/chopped-hummus-dip-with-zaatar-180958\">Chopped Hummus Dip with Za'atar</a>, <a href=\"https://spoonacular.com/recipes/mediterranean-hummus-toast-with-zaatar-1067472\">Mediterranean Hummus Toast with Za’atar</a>, and <a href=\"https://spoonacular.com/recipes/hummus-deviled-eggs-with-zaatar-exercise-challenge-1195539\">Hummus Deviled Eggs with Za’atar {Exercise Challenge}</a> are very similar to this recipe.",
        "cuisines": [
            "Middle Eastern"
        ],
        "dishTypes": [
            "seasoning",
            "marinade"
        ],
        "diets": [
            "gluten free",
            "dairy free",
            "lacto ovo vegetarian",
            "vegan"
        ],
        "occasions": [],
        "spoonacularScore": 98.62712860107422,
        "spoonacularSourceUrl": "https://spoonacular.com/hummus-and-zaatar-766453",
        "reviews": []
    }
])
  }, []);

  // // Filter recipes based on searchTerm
  // const filteredRecipes = trending.filter((recipe) => {
  //   console.log(trending)
  //   return (
  //     searchTerm === "" ||
  //     recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  const fetchMoreRecipes = () => {
    console.log("Fetching more recipes...");
  };

  return (
    <div className="container-search" style={{ padding: "1rem 4rem" }}>
      <SearchBox/>
      <div className="z-10">
        <Heading order={2} style={{ textAlign: "left", width: "100%" }}>
          Trending
        </Heading>
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
              <RecipeSearchBox
                recipe={recipe}
                key={"recipe-" + i} // Consider using a more stable key if possible
              />
            ))}
          </Grid>
        )}
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
        ></Grid>
        <Button onClick={() => {}} style={{ width: "100px" }}>
          Load More
        </Button>
      </div>
    </div>
  );
}
