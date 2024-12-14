import React, { useState } from 'react';

export default function SubstitutingUnhealthy() {
  const [ingredient, setIngredient] = useState('');
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubstitutes([]);

    try {
      const response = await fetch('http://localhost:3333/api/v1/user/getSubstitute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredient }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch substitutes');
      }

      const data = await response.json();
      console.log('Substitutes (Raw):', data.data.top_similar_entities);

      setSubstitutes(data.data.top_similar_entities);
    } catch (error) {
      console.error('Error fetching substitutes:', error);
      setError('Failed to fetch substitutes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-6xl text-gray-700 font-extrabold mt-12 text-center">
          Substituting Unhealthy Ingredients
        </h1>
        <p className="text-gray-600 font-extralight mb-8 mx-[16%] mt-3">
          Substituting unhealthy ingredients with healthier alternatives helps improve the nutritional quality of your meals. Choose whole grains, plant-based options, and natural sweeteners for a healthier, more delicious experience.
        </p>
      </div>

      <div className="min-h-screen bg-bgcolor flex flex-col items-center p-4">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg mt-20 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Ingredient</label>
              <input
                type="text"
                value={ingredient}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-tertiary hover:border-tertiary"
                placeholder="Enter an ingredient"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-tertiary text-white p-3 rounded-lg font-semibold hover:bg-tertiary-dark transition-colors"
            >
              {loading ? 'Loading...' : 'Get Substitutes'}
            </button>
          </form>

          <div className="mt-8">
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {substitutes.length > 0 ? (
              <ul className="text-gray-700">
                {substitutes.map((substitute, index) => (
                  <li key={index}>{substitute}</li>
                ))}
              </ul>
            ) : (
              !loading && <p className="text-gray-500">No substitutes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}