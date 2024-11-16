


import axios from "axios";
import React, { useState } from "react";

export default function RecommendingMeals() {
  const [snackCount, setSnackCount] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState(""); // New state for error handling

  const handleAddSnack = () => {
    if (snackCount < 2) {
      setSnackCount(snackCount + 1);
    }
  };

  const handleSubmit = async () => {
    // Define meals based on user inputs
    const meals = [
      { meal: "Breakfast", name: "Oatmeal", calories: 300, protein: 10, carbs: 50, fat: 5, url: "", image: "path/to/breakfast.jpg" },
      { meal: "Lunch", name: "Chicken Salad", calories: 500, protein: 30, carbs: 40, fat: 20, url: "", image: "path/to/lunch.jpg" },
      { meal: "Dinner", name: "Grilled Salmon", calories: 400, protein: 35, carbs: 20, fat: 15, url: "", image: "path/to/dinner.jpg" },
    ];

    if (snackCount >= 1) {
      meals.push({ meal: "Snack 1", name: "Greek Yogurt", calories: 150, protein: 15, carbs: 10, fat: 5, url: "", image: "path/to/snack1.jpg" });
    }
    if (snackCount === 2) {
      meals.push({ meal: "Snack 2", name: "Protein Bar", calories: 200, protein: 20, carbs: 25, fat: 10, url: "", image: "path/to/snack2.jpg" });
    }

    setLoading(true);
    setError(""); // Clear any previous error
    setDishes([]); // Clear the previous dishes

    try {
      // Send POST request to the backend for each meal
      const responses = await Promise.all(meals.map(meal => axios.post("http://localhost:3333/api/v1/user/mealRecommendation", meal)));
      
      // Process responses and display them
      const dishesWithSubstitutes = responses.map((response, index) => ({
        ...meals[index], // Add original meal data
        substitute: response.data?.data || "No substitutes found", // Add substitute info from backend
      }));

      setDishes(dishesWithSubstitutes); // Update state with the fetched dishes
      setSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("Failed to fetch substitutes. Please try again.");
    } finally {
      setLoading(false); // End loading
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Recommending Meals</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        The best tool for Fitness freaks , allowing you to track your calories and get Ai powered recommendations that fit to your nutrient goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      {snackCount < 2 && (
        <div className="mt-4">
          <button onClick={handleAddSnack} className="bg-secondary text-white px-4 py-2 rounded">
            + Add Snack
          </button>
        </div>
      )}
      <div className="mt-4">
        <button onClick={handleSubmit} className="bg-tertiary text-white px-4 py-2 rounded">Submit</button>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Dish Recommendations */}
      {submitted && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Dish Recommendations</h2>
          <div className="border rounded-lg p-4 shadow-md">
          {dishes.map((dish, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center border-b last:border-b-0 p-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{dish.meal}</h3>
              <p><strong>Name:</strong> {dish.name}</p>
              <p><strong>Substitute:</strong> {typeof dish.substitute === 'object' ? dish.substitute.name || JSON.stringify(dish.substitute) : dish.substitute}</p>
              <button onClick={() => handleMoreClick(dish)} className="bg-gray-500 text-white px-2 py-1 rounded mt-2">Know More</button>
            </div>
            <div className="md:w-1/6 md:ml-4">
              <img src={dish.image} alt={dish.name} className="w-full h-auto rounded-lg" />
            </div>
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
