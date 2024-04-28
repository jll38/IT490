import React from "react";
import TDEECalculator from "../../components/TDEE/TDEECalculator";
import { BACKEND } from "../../lib/constants";
import { User } from "../../lib/token";
export default function Onboarding() {
  const [dietaryRestrictions, setDietRestrictions] = React.useState([]);
  const [tdee, setTDEE] = React.useState(null);


  const handleChange = (event) => {
    const { value, checked } = event.target;
    setDietRestrictions((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  
  React.useEffect(() => {console.log(dietaryRestrictions)}, [dietaryRestrictions]);
  if(!User) return window.location.assign('/')
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      username: User.username,
      restrictions: dietaryRestrictions,
      tdee: Math.floor(tdee),
    });
    console.log(body);
    fetch(`${BACKEND}/api/auth/register/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("onboarding_complete", true);
          window.location.assign("/");
        } else {
          res
            .json()
            .then((data) => {
              console.error("Error:", data.detail || "Failed to onboard");
            })
            .catch((error) => {
              console.error("Failed to parse response:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  return (
    <form class="max-w-lg mx-auto my-4 p-6 bg-white shadow-md rounded-lg">
      <div>
        <h2 class="text-2xl font-semibold">
          Welcome to RecipeApp, {User.username || "undefined"}!
        </h2>
        <div className="block text-sm font-medium text-gray-700">
          Let's get you started
        </div>
      </div>

      <fieldset class="mt-4 mb-4">
        <legend class="text-sm font-medium text-gray-700">
          Dietary Restrictions
        </legend>
        <div class="mt-2 space-y-2">
          {[
            { label: "No Carb", value: "ketogenic" },
            { label: "Gluten Free", value: "gluten free" },
            { label: "Kosher", value: "kosher" },
            { label: "Halal", value: "halal" },
          ].map((option) => (
            <div key={option.value}>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value={option.value}
                  onChange={handleChange}
                  checked={dietaryRestrictions.includes(option.value)}
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span class="ml-2">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <h3 class="text-xl font-semibold">Calculate your Calories</h3>
      <TDEECalculator setTDEE={setTDEE} />
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
        class="mt-6 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Get Started
      </button>
    </form>
  );
}
