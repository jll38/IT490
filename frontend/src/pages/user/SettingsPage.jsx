import React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import TDEECalculator from "../../components/TDEE/TDEECalculator";
import { BACKEND } from "../../lib/constants";
export default function SettingsPage() {
  const [user, setUser] = React.useState(localStorage.getItem("user"));
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

  React.useEffect(() => {
    fetch(`${BACKEND}/api/auth/user-settings/${user}`).then((res) => {
      if (res.ok) {
        console.log("Successfully fetched user settings...");
        res.json().then((data) => {
          setDietRestrictions(
            JSON.parse(data.dietary_restrictions.replace(/'/g, '"'))
          );
          setTDEE(data.TDEE);
        });
      } else {
        res
          .json()
          .then((data) => {
            console.log(data);
            console.error(
              "Error:",
              data.detail || "Failed to retrieve user settings"
            );
          })
          .catch((error) => {
            console.error("Failed to parse response:", error);
          });
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: user,
      restrictions: dietaryRestrictions,
      tdee: Math.floor(tdee),
    });
    fetch(`${BACKEND}/api/auth/register/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        if (res.ok) {
          console.log("Saved");
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
    <div className="pageContainer">
      <section className="p-8 text-black/[0.87] flex-col flex gap-4 items-center w-full min-[0px]:pb-16  min-[576px]:pb-16 min-[992px]:pb-20">
        <h1 className="text-sm text-gray">Settings</h1>
        <PersonIcon style={{ scale: "300%" }} />
        <h2 className="text-3xl">{user}</h2>
        <h2 className="font-bold">Your Current TDEE is: {tdee}</h2>
        <form class="max-w-lg mx-auto my-4 p-6 bg-white shadow-md rounded-lg">
          <fieldset class="mt-4 mb-4">
            <legend class="text-sm font-medium text-gray-700">
              Dietary Restrictions
            </legend>
            <div class="mt-2 space-y-2">
              {[
                { label: "No Carb", value: "noCarb" },
                { label: "Gluten Free", value: "glutenFree" },
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
            Save
          </button>
        </form>
      </section>
    </div>
  );
}
