import React, { useState } from 'react';

const CompatibilityTest = () => {
  // State variables for each ingredient and response
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [response, setResponse] = useState(null); // State to hold response from API

  // Common function to send data to the backend
  const sendToBackend = async (endpoint, ingredients) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, tone, language }),
      });
      const data = await response.json();
      setResponse(data.message || 'Response received'); // Update with the response from backend
    } catch (error) {
      console.error('Error communicating with the backend:', error);
      setResponse('An error occurred while processing your request.');
    }
  };

  // Handle form submission for compatibility check
  const handleCheckCompatibility = () => {
    const ingredients = [ingredient1, ingredient2, ingredient3]; // Create array of ingredients
    sendToBackend('/api/check-compatibility', ingredients); // Replace with your backend endpoint
  };

  // Handle form submission for recipe generation
  const handleGenerateRecipe = () => {
    const ingredients = [ingredient1, ingredient2, ingredient3]; // Create array of ingredients
    sendToBackend('/api/generate-recipe', ingredients); // Replace with your backend endpoint
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Check compatibility and generate new Recipe</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        The best tool for checking the compatibility of ingredients and generating a recipe ingredient compatibility analysis.
      </p>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[66%]">
        {/* Ingredient 1 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredient 1</label>
          <input
            type="text"
            value={ingredient1}
            onChange={(e) => setIngredient1(e.target.value)}
            placeholder="e.g. Ginger"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Ingredient 2 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredient 2</label>
          <input
            type="text"
            value={ingredient2}
            onChange={(e) => setIngredient2(e.target.value)}
            placeholder="e.g. Cinnamon"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Ingredient 3 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredient 3</label>
          <input
            type="text"
            value={ingredient3}
            onChange={(e) => setIngredient3(e.target.value)}
            placeholder="e.g. Pumpkin"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleCheckCompatibility}
            className="w-1/2 p-3 bg-white text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 mr-2"
          >
            Check Compatibility
          </button>
          <button
            onClick={handleGenerateRecipe}
            className="w-1/2 p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 ml-2"
          >
            Generate Recipe
          </button>
        </div>
      </div>

      {/* Display response in a new card */}
      {response && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[66%] mt-8">
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTest;