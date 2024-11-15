import React, { useState } from 'react';

const CompatibilityTest = () => {
  // State variables for each ingredient and response
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [tone, setTone] = useState('');
  const [language, setLanguage] = useState('');
  const [response, setResponse] = useState(null); // State to hold response from API

  // Handle form submission for both buttons
  const handleCheckCompatibility = () => {
    // Simulating an API response
    const compatibilityMessage = `Ingredients ${ingredient1}, ${ingredient2}, and ${ingredient3} are compatible.`;
    setResponse(compatibilityMessage);
    // In a real scenario, make your API call here and update the response
  };

  const handleGenerateRecipe = () => {
    // Simulating an API response
    const recipeMessage = `Recipe generated with ${ingredient1}, ${ingredient2}, and ${ingredient3}.`;
    setResponse(recipeMessage);
    // In a real scenario, make your API call here and update the response
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Check compatibility and generate new Recipie</h1>
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
