import React from "react";
import { Button, Heading } from "@radix-ui/themes";
import RecipeSearchBox from "../components/recipe/RecipeSearchBox";
import "./HomePage.css";
import RecipeCarousel from "../components/carousel/Carousel";
import TDEECalculator from "../components/TDEE/TDEECalculator";
export default function HomePage() {
  return (
    <div className="pageContainer">
      <section className="text-black/[0.87] flex-col flex w-full min-[0px]:pb-16  min-[576px]:pb-16 min-[992px]:pb-20">
        <div className="items-center flex w-full m-auto min-[0px]:flex-col  min-[0px]:justify-center min-[0px]:max-w-[23.75rem] min-[0px]:pt-24 min-[576px]:max-w-[26.25rem] min-[992px]:flex-row min-[992px]:justify-between min-[992px]:max-w-[61.50rem] min-[992px]:pt-12 min-[992px]:pr-9">
          <div className="text-black/75 flex min-[0px]:flex-col  min-[0px]:justify-center min-[0px]:items-center min-[992px]:justify-between min-[992px]:items-start min-[992px]:w-[33.75rem]">
            <h1 className="flex min-[0px]:flex-col  min-[0px]:justify-center min-[0px]:items-center min-[992px]:justify-between min-[992px]:items-start min-[992px]:w-[43.75rem]">
              <span className="text-zinc-700 font-semibold mb-2">
                #1 Nutriton Tracking App
              </span>
              <span className="text-[4.25rem] leading-none font-bold">
                Reach your goals <br />
                <span className="font-light">with Nutripal</span>
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
