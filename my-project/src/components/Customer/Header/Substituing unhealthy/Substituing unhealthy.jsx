import axios from "axios";
import React, { useState } from "react";

export default function SubstituingUnhealthy() {
  const [ingredient, setIngredient] = useState("");
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubstitutes([]);

    try {
      const response = await axios.get(`https://api.example.com/substitutes?ingredient=${ingredient}`);
      setSubstitutes(response.data.substitutes);
    } catch (err) {
      setError("Failed to fetch substitutes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Substituting Unhealthy Ingredients</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Ingredient</label>
            <input
              type="text"
              value={ingredient}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter an ingredient"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Substitutes"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {substitutes.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Substitute Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {substitutes.map((substitute, index) => (
                <li key={index} className="text-gray-700">{substitute}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}