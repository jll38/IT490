import React from "react";
import TDEECalculator from "../../components/TDEE/TDEECalculator";
export default function Onboarding() {
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const handleSubmit = () => {
    // fetch("auth/register/onboarding", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: {},
    // });
    localStorage.setItem("onboarding_complete", true);
    window.location.assign("/")
  };
  return (
    <form class="max-w-lg mx-auto my-4 p-6 bg-white shadow-md rounded-lg">
      <div>
        <h2 class="text-2xl font-semibold">Welcome to RecipeApp, {user || "undefined"}!</h2>
        <div className="block text-sm font-medium text-gray-700">
          Let's get you started
        </div>
      </div>

      <fieldset class="mt-4 mb-4">
        <legend class="text-sm font-medium text-gray-700">
          Dietary Restrictions
        </legend>
        <div class="mt-2 space-y-2">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                name="dietaryRestrictions"
                value="noCarb"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span class="ml-2">No Carb</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                name="dietaryRestrictions"
                value="glutenFree"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span class="ml-2">Gluten Free</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                name="dietaryRestrictions"
                value="kosher"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span class="ml-2">Kosher</span>
            </label>
          </div>
        </div>
      </fieldset>
      <h3 class="text-xl font-semibold">Calculate your Calories</h3>
      <TDEECalculator />
      <button
        type="submit"
        class="mt-6 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Get Started
      </button>
    </form>
  );
}
