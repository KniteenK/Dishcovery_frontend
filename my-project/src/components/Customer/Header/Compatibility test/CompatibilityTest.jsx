import axios from 'axios';
import React, { useState } from 'react';

const CompatibilityTest = () => {
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [response, setResponse] = useState('');

  const sendToBackend = async (endpoint, ingredients) => {
    try {
      const res = await axios.post(
        endpoint,
        { ingredients },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setResponse(res.data?.data || 'Response received'); // Use the response data
    } catch (error) {
      console.error('Error communicating with the backend:', error);
      setResponse('An error occurred while processing your request.');
    }
  };

  const handleCheckCompatibility = () => {
    const ingredients = [ingredient1, ingredient2, ingredient3].filter((i) => i.trim() !== '');
    if (ingredients.length === 0) {
      setResponse('Please provide at least one valid ingredient.');
      return;
    }
    sendToBackend('http://localhost:3333/api/v1/user/compatibilityPredictor', ingredients);
  };

  const handleGenerateRecipe = () => {
    const ingredients = [ingredient1, ingredient2, ingredient3].filter((i) => i.trim() !== '');
    if (ingredients.length === 0) {
      setResponse('Please provide at least one valid ingredient.');
      return;
    }
    sendToBackend('http://localhost:3333/api/v1/user/getSubstitute', ingredients);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgcolor">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Check Compatibility and Generate Recipe</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        The best tool for checking the compatibility of ingredients and generating a recipe ingredient compatibility
        analysis.
      </p>

      {/* Input Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[66%]">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredient 1</label>
          <input
            type="text"
            value={ingredient1}
            onChange={(e) => setIngredient1(e.target.value)}
            placeholder="e.g. Ginger"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary hover:border-tertiary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredient 2</label>
          <input
            type="text"
            value={ingredient2}
            onChange={(e) => setIngredient2(e.target.value)}
            placeholder="e.g. Cinnamon"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary hover:border-tertiary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ingredient 3</label>
          <input
            type="text"
            value={ingredient3}
            onChange={(e) => setIngredient3(e.target.value)}
            placeholder="e.g. Pumpkin"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary hover:border-tertiary"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleCheckCompatibility}
            className="w-1/2 p-3 bg-white text-tertiary border border-tertiary rounded-md hover:bg-purple-50 mr-2"
          >
            Check Compatibility
          </button>
          <button
            onClick={handleGenerateRecipe}
            className="w-1/2 p-3 bg-tertiary text-white rounded-md hover:bg-tertiary ml-2"
          >
            Generate Recipe
          </button>
        </div>
      </div>

      {/* Response Card */}
      {response && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[66%] mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Response</h2>
          <p className="text-gray-700">{typeof response === 'string' ? response : JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTest;
