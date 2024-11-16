import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SubstitutingUnhealthy() {
  const [ingredient, setIngredient] = useState("");
  const [entityName, setEntityName] = useState("");  // State to store the entity name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ingredient === '') {
      toast.error('Please enter an ingredient', {
        position: 'bottom-right',
        autoClose: 2000,
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
      return;
    }

    setLoading(true);
    setError("");
    setEntityName("");  // Reset entity name before fetching new data

    try {
      const url = "http://localhost:3333/api/v1/user/getSubstitute";  // Your API URL
      const response = await axios.post(url, { ingredient });

      if (response.status === 200) {
        toast.success('Entity name fetched successfully', {
          position: 'bottom-right',
          autoClose: 2000,
        });

        const { entity_alias } = response.data.data;  // Extract the entity alias
        setEntityName(entity_alias || "");  // Store the entity name in state
       
      } else {
        toast.error(response.data.message || 'Failed to fetch entity name', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Substituting Unhealthy Ingredients</h1>
         <p className="text-gray-600 mb-8 ml-[16%] text-center max-w-xl">
        The best tool for checking the compatibility of ingredients and generating a recipe ingredient compatibility analysis.
      </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Ingredient</label>
            <input
              type="text"
              value={ingredient}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter an ingredient"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-tertiary text-white p-3 rounded-lg hover:tertiary transition duration-300"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Substitutes"}
          </button>
        </form>
        
        {error && <p className="text-red-500 mt-4">{error}</p>}
        
        {entityName && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Entity Name</h2>
            <div className="p-4 border border-gray-300 rounded-lg">
              <p className="text-gray-700">{entityName}</p>  {/* Display the entity name */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
