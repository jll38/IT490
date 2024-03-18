import React, { useState } from "react";

function TDEECalculator() {
  const [unit, setUnit] = useState("metric"); // 'metric' or 'imperial'
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.2");
  const [tdee, setTdee] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);

  React.useEffect(() => {
    console.log(weightGoal);
  }, [weightGoal]);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    // Reset fields to avoid confusion when switching units
    setWeight("");
    setHeight("");
    setTdee(0);
  };

  const calculateBMR = () => {
    let weightInKg = unit === "imperial" ? weight / 2.20462 : weight; // Convert lbs to kg if imperial
    let heightInCm = unit === "imperial" ? height * 2.54 : height; // Convert inches to cm if imperial

    if (gender === "male") {
      return 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    }
    return 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const tdee = bmr * Number(activity);
    setTdee(tdee);
  };

  return (
    <div>
      <div class="my-6">
        <span class="block text-sm font-medium text-gray-700">Your Goal</span>
        <div class="">
          <label class="inline-flex items-center">
            <input
              type="radio"
              name="weightChangePace"
              value={-250}
              onChange={(e) => {
                setWeightGoal(e.target.value);
              }}
              class="text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-2">Lose Weight (mild: 0.5 lb/week)</span>
          </label>
        </div>

        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              name="weightChangePace"
              value={-500}
              onChange={(e) => {
                setWeightGoal(e.target.value);
              }}
              class="text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-2">Lose Weight (rapid: 1 lb/week)</span>
          </label>
        </div>

        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              name="weightChangePace"
              value={0}
              checked
              onChange={(e) => {
                setWeightGoal(e.target.value);
              }}
              class="text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-2">Maintain Weight</span>
          </label>
        </div>

        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              name="weightChangePace"
              value={250}
              onChange={(e) => {
                setWeightGoal(e.target.value);
              }}
              class="text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-2">Gain Weight (mild: 0.5 lb/week)</span>
          </label>
        </div>

        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              name="weightChangePace"
              value={500}
              onChange={(e) => {
                setWeightGoal(e.target.value);
              }}
              class="text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span class="ml-2">Gain Weight (rapid: 1 lb/week)</span>
          </label>
        </div>
      </div>
      <div className="max-w-md mx-auto p-4 mb-4">
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Units</span>
          <select
            value={unit}
            onChange={handleUnitChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, inches)</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            id="weight"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-sm font-medium text-gray-700"
          >
            Height ({unit === "metric" ? "cm" : "inches"})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            id="height"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            id="age"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Gender
          </span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-6">
          <span className="block text-sm font-medium text-gray-700">
            Activity Level
          </span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly active</option>
            <option value="1.55">Moderately active</option>
            <option value="1.725">Very active</option>
            <option value="1.9">Super active</option>
          </select>
        </div>
        <button
          onClick={calculateTDEE}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate TDEE
        </button>
        {tdee > 0 && (
          <div className="mt-4 p-4 text-sm text-gray-700 bg-gray-100 rounded-lg">
            Your Total Daily Energy Expenditure (TDEE) is {tdee.toFixed(2)}{" "}
            calories. <br />
            Based on your goal, you should consume{" "}
            {Number.parseInt(tdee + weightGoal)} Calories per day.
          </div>
        )}
      </div>
    </div>
  );
}

export default TDEECalculator;
