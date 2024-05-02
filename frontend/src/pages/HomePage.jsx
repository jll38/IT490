import React from "react";
import { Button, Heading } from "@radix-ui/themes";
import RecipeSearchBox from "../components/recipe/RecipeSearchBox";
import "./HomePage.css";
import RecipeCarousel from "../components/carousel/Carousel";
import TDEECalculator from "../components/TDEE/TDEECalculator";
export default function HomePage() {
  const user = localStorage.getItem("user");
  const onboarding_complete = Boolean(
    localStorage.getItem("onboarding_complete")
  );
  console.log("user")


  
  

  const [recentlyViewed, setRecentlyViewed] = React.useState([
    {
      title: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish with a meaty tomato sauce.",
      nutrition: {
        calories: 850,
        protein: 25,
        fat: 35,
        carbs: 100,
      },
      id: "1",
      src: "spaghetti-bolognese.jpg",
    },
    {
      title: "Caesar Salad",
      description:
        "Crisp romaine lettuce tossed with Caesar dressing, croutons, and parmesan cheese.",
      nutrition: {
        calories: 470,
        protein: 12,
        fat: 34,
        carbs: 22,
      },
      id: "2",
      src: "caesar-salad.jpg",
    },
    {
      title: "Grilled Salmon",
      description:
        "Fresh salmon fillet grilled to perfection with a side of asparagus.",
      nutrition: {
        calories: 640,
        protein: 45,
        fat: 40,
        carbs: 5,
      },
      id: "3",
      src: "grilled-salmon.jpg",
    },
    {
      title: "Chicken Curry",
      description:
        "A flavorful curry made with tender chicken pieces, spices, and coconut milk.",
      nutrition: {
        calories: 550,
        protein: 30,
        fat: 20,
        carbs: 50,
      },
      id: "4",
      src: "chicken-curry.jpg",
    },
    {
      title: "Veggie Pizza",
      description:
        "A delicious pizza topped with a variety of vegetables on a gluten-free crust.",
      nutrition: {
        calories: 720,
        protein: 20,
        fat: 25,
        carbs: 105,
      },
      id: "5",
      src: "veggie-pizza.jpg",
    },
    {
      title: "Quinoa Salad",
      description:
        "A healthy and refreshing salad with quinoa, cucumber, tomatoes, and feta cheese.",
      nutrition: {
        calories: 420,
        protein: 14,
        fat: 18,
        carbs: 55,
      },
      id: "6",
      src: "quinoa-salad.jpg",
    },
    {
      title: "Beef Stew",
      description:
        "Hearty beef stew with potatoes, carrots, and peas in a rich and savory sauce.",
      nutrition: {
        calories: 600,
        protein: 35,
        fat: 22,
        carbs: 50,
      },
      id: "7",
      src: "beef-stew.jpg",
    },
    {
      title: "Chocolate Cake",
      description:
        "Moist and rich chocolate cake with a creamy chocolate frosting.",
      nutrition: {
        calories: 790,
        protein: 8,
        fat: 44,
        carbs: 92,
      },
      id: "8",
      src: "chocolate-cake.jpg",
    },
    {
      title: "Avocado Toast",
      description:
        "Toasted bread topped with smashed avocado, salt, pepper, and a drizzle of olive oil.",
      nutrition: {
        calories: 310,
        protein: 6,
        fat: 25,
        carbs: 24,
      },
      id: "9",
      src: "avocado-toast.jpg",
    },
    {
      title: "Berry Smoothie",
      description:
        "A refreshing smoothie made with a mix of berries, banana, and almond milk.",
      nutrition: {
        calories: 280,
        protein: 3,
        fat: 4,
        carbs: 56,
      },
      id: "10",
      src: "berry-smoothie.jpg",
    },
  ]);
  //fetch on page load
  React.useEffect(() => {}, []);

  if(user){
    if(!onboarding_complete) window.location.assign("/register/onboarding_complete")
    return window.location.assign("/recipes")
  } 
  return user ? (
    <div className="pageContainer px-10 py-5">
      <div>
        <Heading>Recently Viewed</Heading>
        <RecipeCarousel recipes={recentlyViewed} />
      </div>
    </div>
  ) : (
    <div className="pageContainer">
      <section className="bg-pink-500 flex-col flex w-full min-[0px]:pb-16  min-[576px]:pb-16 min-[992px]:pb-20">
        <div className="items-center flex w-full m-auto min-[0px]:flex-col  min-[0px]:justify-center min-[0px]:max-w-[23.75rem] min-[0px]:pt-24 min-[576px]:max-w-[26.25rem] min-[992px]:flex-row min-[992px]:justify-between min-[992px]:max-w-[61.50rem] min-[992px]:pt-12 min-[992px]:pr-9">
          <div className="text-black/75 flex min-[0px]:flex-col  min-[0px]:justify-center min-[0px]:items-center min-[992px]:justify-between min-[992px]:items-start min-[992px]:w-[33.75rem]">
            <h1 className="flex min-[0px]:flex-col  min-[0px]:justify-center min-[0px]:items-center min-[992px]:justify-between min-[992px]:items-start min-[992px]:w-[43.75rem]">
              <span className="text-zinc-700 font-semibold mb-2">
                #1 Nutriton Tracking App
              </span>
              <span className="text-[4.25rem] leading-none font-bold">
                Reach your goals <br />
                <span className="font-light">with AppName</span>
              </span>
            </h1>
            Build healthy habits with the all-in-one food, exercise, and calorie
            tracker.
            <button
              variant="soft"
              className="font-bold"
              onClick={() => {
                window.location.assign("/register");
              }}
            >
              Start Today
              <svg
                className="cursor-pointer inline-block w-4 h-4 ml-1"
                fill="rgb(0, 102, 238)"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                  fill="rgb(0, 102, 238)"
                />
              </svg>
            </button>
          </div>
          <div className="blur-[0px]">
            <span className="relative inline-block">
              <img
                className="w-[400px] h-[31.29rem]"
                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27263%27%20height=%27531%27/%3e"
              />
              <img
                className="bottom-0 left-0 absolute top-0 w-[400px] h-[31.29rem]"
                src="./images/hero-image.png"
              />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
