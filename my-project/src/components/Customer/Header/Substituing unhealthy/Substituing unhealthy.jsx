import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SubstitutingUnhealthy() {
  const [ingredient, setIngredient] = useState("");
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient === "") {
      toast.error("Please enter an ingredient", {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return;
    }

    setLoading(true);
    setError("");
    setSubstitutes([]);

    // Hardcoding rice substitutes with categories
    const hardcodedSubstitutes = [
      { name: "Quinoa", category: "Cereal" },
      { name: "Bulgur", category: "Cereal" },
      { name: "Cauliflower Rice", category: "Vegetable" },
      { name: "Shirataki Rice", category: "Vegetable" },
      { name: "Chia Seeds", category: "Berry" },
      { name: "Blueberries", category: "Berry" },
      { name: "Strawberries", category: "Berry" },
    ];

    setTimeout(() => {
      setSubstitutes(hardcodedSubstitutes); // Simulate fetching data
      setLoading(false);
      toast.success("Substitutes fetched successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bgcolor flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg mt-20 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Substituting Unhealthy Ingredients
        </h1>
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
            className="w-full bg-tertiary text-white p-3 rounded-lg hover:bg-tertiary-dark transition duration-300"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Substitutes"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Displaying the loading state */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-12 h-12 border-t-4 border-tertiary border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Displaying the substitutes */}
        {substitutes.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {substitutes.map((substitute, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {substitute.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">Category: {substitute.category}</p>
                <div className="text-center py-2 mt-4">
                  <span className="inline-block bg-tertiary text-white text-xs font-semibold py-1 px-4 rounded-full">
                    {substitute.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}