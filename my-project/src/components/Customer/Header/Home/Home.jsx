import React, { useState } from "react";
import Sidebar from "./Sidebar/";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const recipes = [
    { id: 1, name: "Chicken Handi", cuisine: "Indian", rating: 4, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Chicken Congee", cuisine: "Chinese", rating: 4, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Chicken Alfredo", cuisine: "Italian", rating: 5, image: "https://via.placeholder.com/150" },
    // Add more recipes here
  ];

  const handleSearch = () => {
    const results = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(results);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8">
          <h2 className="text-center text-2xl font-semibold mb-4">Search</h2>
          <div className="flex items-center shadow-md bg-white rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for a recipe..."
              className="p-4 flex-grow text-gray-700 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-700 text-white px-6 py-4 rounded-r-full"
            >
              Search Now
            </button>
          </div>
        </div>

        {/* Recipe Cards */}
        <div className="flex flex-wrap gap-4 mt-8">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="border rounded-lg p-4 shadow-md bg-white">
                <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-lg mb-4" />
                <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Full Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
