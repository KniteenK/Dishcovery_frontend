import React, { useState } from "react";

export default function RecommendingMeals() {
  const [snackCount, setSnackCount] = useState(0);
  const [dishes, setDishes] = useState([]);
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
      calories: document.querySelector('input[placeholder="Calories"]').value,
      protein: document.querySelector('input[placeholder="Protein"]').value,
      carbs: document.querySelector('input[placeholder="Carbs"]').value,
      fat: document.querySelector('input[placeholder="Fat"]').value,
    };

    const lunch = {
      calories: document.querySelector('input[placeholder="Calories"]').value,
      protein: document.querySelector('input[placeholder="Protein"]').value,
      carbs: document.querySelector('input[placeholder="Carbs"]').value,
      fat: document.querySelector('input[placeholder="Fat"]').value,
    };

    const dinner = {
      calories: document.querySelector('input[placeholder="Calories"]').value,
      protein: document.querySelector('input[placeholder="Protein"]').value,
      carbs: document.querySelector('input[placeholder="Carbs"]').value,
      fat: document.querySelector('input[placeholder="Fat"]').value,
    };

    const snacks = [];
    if (snackCount >= 1) {
      snacks.push({
        calories: document.querySelector('input[placeholder="Calories"]:nth-child(1)').value,
        protein: document.querySelector('input[placeholder="Protein"]:nth-child(1)').value,
        carbs: document.querySelector('input[placeholder="Carbs"]:nth-child(1)').value,
        fat: document.querySelector('input[placeholder="Fat"]:nth-child(1)').value,
      });
    }
    if (snackCount === 2) {
      snacks.push({
        calories: document.querySelector('input[placeholder="Calories"]:nth-child(2)').value,
        protein: document.querySelector('input[placeholder="Protein"]:nth-child(2)').value,
        carbs: document.querySelector('input[placeholder="Carbs"]:nth-child(2)').value,
        fat: document.querySelector('input[placeholder="Fat"]:nth-child(2)').value,
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
      console.log(data.data.payload.data);
      setDishes(data.data.payload.data.slice(0, 3));
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
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Recommending Meals</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        The best tool for Fitness freaks, allowing you to track your calories and get AI-powered recommendations that fit your nutrient goals.
      </p>
      <div className="flex flex-row gap-4">
        {/* Breakfast Card */}
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Breakfast</h2>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Calories" className="border p-2 rounded" />
            <input type="text" placeholder="Protein" className="border p-2 rounded" />
            <input type="text" placeholder="Carbs" className="border p-2 rounded" />
            <input type="text" placeholder="Fat" className="border p-2 rounded" />
          </div>
        </div>
        {/* Lunch Card */}
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Lunch</h2>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Calories" className="border p-2 rounded" />
            <input type="text" placeholder="Protein" className="border p-2 rounded" />
            <input type="text" placeholder="Carbs" className="border p-2 rounded" />
            <input type="text" placeholder="Fat" className="border p-2 rounded" />
          </div>
        </div>
        {/* Dinner Card */}
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Dinner</h2>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Calories" className="border p-2 rounded" />
            <input type="text" placeholder="Protein" className="border p-2 rounded" />
            <input type="text" placeholder="Carbs" className="border p-2 rounded" />
            <input type="text" placeholder="Fat" className="border p-2 rounded" />
          </div>
        </div>
        {/* Snack Cards */}
        {snackCount >= 1 && (
          <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Snack 1</h2>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Calories" className="border p-2 rounded" />
              <input type="text" placeholder="Protein" className="border p-2 rounded" />
              <input type="text" placeholder="Carbs" className="border p-2 rounded" />
              <input type="text" placeholder="Fat" className="border p-2 rounded" />
            </div>
          </div>
        )}
        {snackCount === 2 && (
          <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Snack 2</h2>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Calories" className="border p-2 rounded" />
              <input type="text" placeholder="Protein" className="border p-2 rounded" />
              <input type="text" placeholder="Carbs" className="border p-2 rounded" />
              <input type="text" placeholder="Fat" className="border p-2 rounded" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-4">
        {snackCount < 2 && (
          <button onClick={handleAddSnack} className="bg-secondary text-white px-4 py-2 rounded">
            + Add Snack
          </button>
        )}
        <button onClick={handleSubmit} className="bg-tertiary text-white px-4 py-2 rounded">Submit</button>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
   
      {/* Dish Recommendations */}
      {submitted && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Dish Recommendations</h2>
          <div className="flex flex-row gap-4">
            {dishes.map((dish, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md bg-white h-full flex flex-col justify-between">
                <h3 className="text-lg font-semibold mb-2">
                  {index === 0 ? "Breakfast" : index === 1 ? "Lunch" : "Dinner"}
                </h3>
                <img src={dish.image} alt={dish.name} className="w-full h-auto rounded-lg mb-4" />
                <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
                <p><strong>Title:</strong> {dish.Recipe_title}</p>
                <p><strong>Calories:</strong> {dish.Calories}</p>
                <p><strong>Protein:</strong> {dish.Protein}g</p>
                <p><strong>Fat:</strong> {dish.fat}g</p>
                <p><strong>Carbohydrate:</strong> {dish.carbs}g</p>
                <p><strong>Energy:</strong> {dish.Calories} kcal</p>
                <p><strong>Vegan:</strong> {dish.vegan === "1.0" ? "Yes" : "No"}</p>
                <p><strong>Cook Time:</strong> {dish.cook_time} minutes</p>
                <p><strong>Prep Time:</strong> {dish.prep_time} minutes</p>
                <p><strong>Servings:</strong> {dish.servings}</p>
                <button onClick={() => handleMoreClick(dish)} className="bg-primary text-white px-2 py-1 rounded mt-2">Know More</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for more details */}
      {isModalOpen && selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-[46%] relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <div className="max-h-full overflow-y-auto p-4">
              <h2 className="text-2xl font-bold mb-4">{selectedDish.name}</h2>
              <p><strong>Calories:</strong> {selectedDish.calories}</p>
              <p><strong>Protein:</strong> {selectedDish.protein}g</p>
              <p><strong>Carbs:</strong> {selectedDish.carbs}g</p>
              <p><strong>Fat:</strong> {selectedDish.fat}g</p>
              <p><strong>Vitamins:</strong> {selectedDish.vitamins}</p>
              <p><strong>Minerals:</strong> {selectedDish.minerals}</p>

              <div className="flex justify-center mt-4">
                <button onClick={() => window.open(selectedDish.url, "_blank")} className="bg-blue-500 text-white px-4 py-2 rounded">Redirect</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}