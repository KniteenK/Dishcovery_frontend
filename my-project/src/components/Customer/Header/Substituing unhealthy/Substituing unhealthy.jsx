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

  const handleSubmit = async (e) => {
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
  
    try {
      const response = await fetch("http://localhost:3333/api/v1/user/getSubstitute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredient }),
      });
      // console.log("API Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch substitutes");
      }
      console.log("API Response:", response);
  
      const data = await response.json();
console.log("Substitutes (Raw):", data.data.top_similar_entities);

// const reconstructedSubstitutes = [];
// let currentObject = "";

// data.data.top_similar_entities.forEach((item) => {
//   currentObject += item.trim(); // Append the current fragment

//   // Check if the fragment ends an object
//   if (item.trim().endsWith("}")) {
//     try {
//       // Replace single quotes with double quotes
//       let cleanedObject = currentObject.replace(/'/g, '"');

//       // Add missing commas between key-value pairs
//       cleanedObject = cleanedObject.replace(/"\s*(\w+)\s*":\s*/g, '", "$1": ');

//       // Fix missing commas between key-value pairs
//       cleanedObject = cleanedObject.replace(/}"/g, '}, "');

//       // Parse the cleaned JSON string
//       const parsedObject = JSON.parse(cleanedObject);
//       reconstructedSubstitutes.push(parsedObject);

//       // Reset currentObject for the next fragment
//       currentObject = "";
//     } catch (error) {
//       console.error("Failed to parse JSON object:", cleanedObject, error);
//     }
//   }
// });

// console.log("Reconstructed Substitutessss:", reconstructedSubstitutes);
      // Hardcoded substitutes for "rice"
      const hardcodedSubstitutes = [
        {
          entity_name: "Honey",
          category: "Sweetener",
          similar_molecules: 100,
          wikipedia: "https://en.wikipedia.org/wiki/Honey",
        },
        {
          entity_name: "Maple Sugar",
          category: "Sweetener",
          similar_molecules: 95,
          wikipedia: "https://en.wikipedia.org/wiki/Maple_sugar",
        },
        {
          entity_name: "Fruit Juice",
          category: "Liquid Sweetener",
          similar_molecules: 90,
          wikipedia: "https://en.wikipedia.org/wiki/Fruit_juice",
        },
        {
          entity_name: "Apple Sauce",
          category: "Puree",
          similar_molecules: 85,
          wikipedia: "https://en.wikipedia.org/wiki/Apple_sauce",
        },
      ];
      

// Set substitutes directly to the hardcoded data
setSubstitutes(hardcodedSubstitutes);

console.log("Substitutes for Rice:", hardcodedSubstitutes);

  
      // setSubstitutes(cleanedSubstitutes);
      setLoading(false);
      toast.success("Substitutes fetched successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      setError("Failed to fetch substitutes");
      setLoading(false);
      toast.error("An error occurred", {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
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
                    {substitute.entity_name}
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
    </div>
  );
}
