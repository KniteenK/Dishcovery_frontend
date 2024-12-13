import React, { useState } from "react";

export default function RecommendingMeals() {
  const [snackCount, setSnackCount] = useState(0);
  const [dishes, setDishes] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [submitted, setSubmitted] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddSnack = () => {
    if (snackCount < 2) {
      setSnackCount(snackCount + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const breakfast = {
      calories: document.querySelector('#breakfast-calories').value,
      protein: document.querySelector('#breakfast-protein').value,
      carbs: document.querySelector('#breakfast-carbs').value,
      fat: document.querySelector('#breakfast-fat').value,
    };

    const lunch = {
      calories: document.querySelector('#lunch-calories').value,
      protein: document.querySelector('#lunch-protein').value,
      carbs: document.querySelector('#lunch-carbs').value,
      fat: document.querySelector('#lunch-fat').value,
    };

    const dinner = {
      calories: document.querySelector('#dinner-calories').value,
      protein: document.querySelector('#dinner-protein').value,
      carbs: document.querySelector('#dinner-carbs').value,
      fat: document.querySelector('#dinner-fat').value,
    };

    const snacks = [];
    if (snackCount >= 1) {
      snacks.push({
        calories: document.querySelector('#snack1-calories').value,
        protein: document.querySelector('#snack1-protein').value,
        carbs: document.querySelector('#snack1-carbs').value,
        fat: document.querySelector('#snack1-fat').value,
      });
    }
    if (snackCount === 2) {
      snacks.push({
        calories: document.querySelector('#snack2-calories').value,
        protein: document.querySelector('#snack2-protein').value,
        carbs: document.querySelector('#snack2-carbs').value,
        fat: document.querySelector('#snack2-fat').value,
      });
    }

    try {
      const response = await fetch("http://localhost:3333/api/v1/user/mealRecommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          breakfast,
          lunch,
          dinner,
          snacks,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the meal recommendation.");
      }

      const data = await response.json();
      console.log(data.data);
      setDishes(data.data);  // Set the entire data from the API response
      setSubmitted(true);
    } catch (error) {
      setError("Failed to fetch meal recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoreClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgcolor">
      <h1 className="text-6xl text-gray-700 font-extrabold">Recommending Meals</h1>
      <p className="text-gray-600 mb-8 max-w-xl mr-6">
        The best tool for Fitness freaks, allowing you to track your calories and get AI-powered recommendations that fit your nutrient goals.
      </p>
      <div className="flex flex-row gap-6 flex-wrap justify-center bg-gray-100 p-6 rounded-lg">
  {/* Breakfast Card */}
  <div className="bg-white border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow max-w-sm w-full">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Breakfast</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        id="breakfast-calories"
        placeholder="Calories"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        id="breakfast-protein"
        placeholder="Protein"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        id="breakfast-carbs"
        placeholder="Carbs"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        id="breakfast-fat"
        placeholder="Fat"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>
  {/* Lunch Card */}
  <div className="bg-white border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow max-w-sm w-full">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Lunch</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        id="lunch-calories"
        placeholder="Calories"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        id="lunch-protein"
        placeholder="Protein"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        id="lunch-carbs"
        placeholder="Carbs"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        id="lunch-fat"
        placeholder="Fat"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  </div>
  {/* Dinner Card */}
  <div className="bg-white border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow max-w-sm w-full">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Dinner</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        id="dinner-calories"
        placeholder="Calories"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="text"
        id="dinner-protein"
        placeholder="Protein"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="text"
        id="dinner-carbs"
        placeholder="Carbs"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="text"
        id="dinner-fat"
        placeholder="Fat"
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  </div>


        {/* Snack Cards */}
        {snackCount >= 1 && (
          <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Snack 1</h2>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" id="snack1-calories" placeholder="Calories" className="border p-2 rounded" />
              <input type="text" id="snack1-protein" placeholder="Protein" className="border p-2 rounded" />
              <input type="text" id="snack1-carbs" placeholder="Carbs" className="border p-2 rounded" />
              <input type="text" id="snack1-fat" placeholder="Fat" className="border p-2 rounded" />
            </div>
          </div>
        )}
        {snackCount === 2 && (
          <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Snack 2</h2>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" id="snack2-calories" placeholder="Calories" className="border p-2 rounded" />
              <input type="text" id="snack2-protein" placeholder="Protein" className="border p-2 rounded" />
              <input type="text" id="snack2-carbs" placeholder="Carbs" className="border p-2 rounded" />
              <input type="text" id="snack2-fat" placeholder="Fat" className="border p-2 rounded" />
            </div>
          </div>
        )}
      </div>
      <button onClick={handleSubmit} className="mt-6 px-6 py-3 bg-tertiary text-white rounded-lg shadow-md hover:bg-tertiary transition-colors">
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {submitted && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Recommended Meals</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Display Breakfast */}
            {dishes.breakfast?.slice(0, 1).map((dish) => (
              <div key={dish.Recipe_id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={dish.img_url} alt={dish.Recipe_title} className="w-full h-40 object-cover rounded mb-3" />
                <h3 className="text-lg font-semibold mb-2">{dish.Recipe_title}</h3>
                <button onClick={() => handleMoreClick(dish)} className="text-blue-500">View More</button>
              </div>
            ))}
            {/* Display Lunch */}
            {dishes.lunch?.slice(1, 2).map((dish) => (
              <div key={dish.Recipe_id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={dish.img_url} alt={dish.Recipe_title} className="w-full h-40 object-cover rounded mb-3" />
                <h3 className="text-lg font-semibold mb-2">{dish.Recipe_title}</h3>
                <button onClick={() => handleMoreClick(dish)} className="text-blue-500">View More</button>
              </div>
            ))}
            {/* Display Dinner */}
            {dishes.dinner?.slice(2, 3).map((dish) => (
              <div key={dish.Recipe_id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                <img src={dish.img_url} alt={dish.Recipe_title} className="w-full h-40 object-cover rounded mb-3" />
                <h3 className="text-lg font-semibold mb-2">{dish.Recipe_title}</h3>
                <button onClick={() => handleMoreClick(dish)} className="text-blue-500">View More</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && selectedDish && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">{selectedDish.Recipe_title}</h2>
            <img src={selectedDish.img_url} alt={selectedDish.Recipe_title} className="w-full h-40 object-cover rounded mb-3" />
            <p>{selectedDish.Recipe_description}</p>
            <button onClick={closeModal} className="mt-4 text-white bg-red-500 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
