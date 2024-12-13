import { Checkbox, CheckboxGroup, Slider } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Continent = [
  { name: "Asian", count: 6480 },
  { name: "European", count: 5714 },
  { name: "South American", count: 4790 },
  { name: "North American", count: 4252 },
  { name: "African", count: 3660 },
];

const Region = [
  { name: "French", count: 6480 },
  { name: "Middle Eastern", count: 5714 },
  { name: "Indian", count: 4790 },
  { name: "Nigerian", count: 4252 },
  { name: "Egyptian", count: 3660 },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [energy, setEnergy] = useState(70);
  const [carbohydrate, setCarbohydrate] = useState(50);
  const [protein, setProtein] = useState(30);
  const [fat, setFat] = useState(20);
  const [prepTime, setPrepTime] = useState(30); // Initial value for preparation time
  const [vegan, setVegan] = useState(false); // Initial value for vegan
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKnowMoreClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  // useEffect hook to handle the API search when filters change
  useEffect(() => {
    const handleSearch = async () => {
      console.log("Searching for recipes...");
      const filters = {
        searchTerm,
        selectedContinent,
        selectedRegion,
        energy,
        carbohydrate,
        protein,
        fat,
        prepTime,
        vegan,
      };

      console.log("Posting to API with filters:", filters);

      try {
        const response = await axios.post("http://localhost:3333/api/v1/user/advSearch", filters);
        console.log("API Response:", response.data.data.data);
        setFilteredRecipes(response.data.data || []);
      } catch (error) {
        console.error("An error occurred while fetching recipes:", error);
        setFilteredRecipes([]);
      }
    };

    handleSearch(); // Trigger search whenever any of the filters change
  }, [
    searchTerm,
    selectedContinent,
    selectedRegion,
    energy,
    carbohydrate,
    protein,
    fat,
    prepTime,
    vegan,
  ]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4 rounded-lg h-screen overflow-y-auto fixed">
        <h2 className="text-lg font-semibold mb-4">Continent</h2>
        <CheckboxGroup
          label="Select One Continent"
          color="warning"
          value={selectedContinent}
          onValueChange={(value) => setSelectedContinent(value.length > 1 ? [value[value.length - 1]] : value)}
        >
          <div className="grid grid-cols-2 gap-4">
            {Continent.map((continent) => (
              <Checkbox key={continent.name} value={continent.name}>
                {continent.name} ({continent.count})
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>

        <h2 className="text-lg font-semibold mb-4 mt-6">Region</h2>
        <CheckboxGroup
          label="Select One Region"
          color="warning"
          value={selectedRegion}
          onValueChange={(value) => setSelectedRegion(value.length > 1 ? [value[value.length - 1]] : value)}
        >
          <div className="grid grid-cols-2 gap-4">
            {Region.map((region) => (
              <Checkbox key={region.name} value={region.name}>
                {region.name} ({region.count})
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>

        <h2 className="text-lg font-semibold mt-6 mb-4">Energy Bar</h2>
        <Slider
          color="warning"
          step={1}
          maxValue={1000}
          minValue={0}
          value={energy}
          onChange={setEnergy}
          aria-label="Energy"
          className="max-w-md"
        />
        <div className="mt-2 text-center">
          <span className="text-gray-700 text-sm">Energy: {energy}</span>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Carbohydrate</h2>
        <Slider
          color="warning"
          step={1}
          maxValue={500}
          minValue={0}
          value={carbohydrate}
          onChange={setCarbohydrate}
          aria-label="Carbohydrate"
          className="max-w-md"
        />
        <div className="mt-2 text-center">
          <span className="text-gray-700 text-sm">Carbohydrate: {carbohydrate}</span>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Protein</h2>
        <Slider
          color="warning"
          step={1}
          maxValue={300}
          minValue={0}
          value={protein}
          onChange={setProtein}
          aria-label="Protein"
          className="max-w-md"
        />
        <div className="mt-2 text-center">
          <span className="text-gray-700 text-sm">Protein: {protein}</span>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Fat</h2>
        <Slider
          color="warning"
          step={1}
          maxValue={200}
          minValue={0}
          value={fat}
          onChange={setFat}
          aria-label="Fat"
          className="max-w-md"
        />
        <div className="mt-2 text-center">
          <span className="text-gray-700 text-sm">Fat: {fat}</span>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Preparation Time (minutes)</h2>
        <Slider
          color="warning"
          step={1}
          maxValue={60}
          minValue={0}
          value={prepTime}
          onChange={setPrepTime}
          aria-label="Preparation Time"
          className="max-w-md"
        />
        <div className="mt-2 text-center">
          <span className="text-gray-700 text-sm">Preparation Time: {prepTime} minutes</span>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Vegan</h2>
        <div className="flex items-center">
          <Checkbox
            isSelected={vegan}
            onChange={() => setVegan(!vegan)}
            color="warning"
          >
            Vegan
          </Checkbox>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-bgcolor ml-auto overflow-y-auto h-screen">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8">
          <h2 className="text-center text-2xl font-semibold mb-4">Search</h2>
          <div className="flex items-center shadow-sm bg-white rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for a recipe..."
              className="p-4 flex-grow text-gray-700 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-secondary text-white px-6 py-4 rounded-r-full"
              onClick={() => setSearchTerm(searchTerm)} // Just update search term and let useEffect handle the search
            >
              Search Now
            </button>
          </div>
        </div>

        {/* Recipe Cards */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
        {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
  filteredRecipes.map((recipe, index) => (
    <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="border rounded-lg p-4 shadow-sm bg-white h-full flex flex-col justify-between">
        {/* Fixed image size */}
        <img
          src={recipe.img_url}
          alt={recipe.Recipe_title}
          className="w-full h-48 object-cover rounded-lg mb-4" // Set a fixed height and width for consistency
        />
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{recipe.Recipe_title}</h3> {/* Add line-clamp to prevent title overflow */}
        
        <button
          className="bg-tertiary text-white px-4 py-2 rounded mt-auto" // mt-auto to push the button to the bottom
          onClick={() => handleKnowMoreClick(recipe)}
        >
          Know More
        </button>
      </div>
    </div>
  ))


          ) : (
            <p className="text-center text-gray-700">No recipes found.</p>
          )}
        </div>
      </div>
      {isModalOpen && selectedRecipe && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-4">{selectedRecipe.name}</h2>
      <p><strong>Carbohydrate:</strong> {selectedRecipe["Carbohydrate, by difference (g)"]}g</p>
      <p><strong>Energy:</strong> {selectedRecipe["Energy (kcal)"]} kcal</p>
      <p><strong>Protein:</strong> {selectedRecipe["Protein (g)"]}g</p>
      <p><strong>Fat:</strong> {selectedRecipe["Total lipid (fat) (g)"]}g</p>
      <p><strong>Vegan:</strong> {selectedRecipe.vegan === "1.0" ? "Yes" : "No"}</p>
      <p><strong>Total Time:</strong> {selectedRecipe.total_time} minutes</p>
      <p><strong>Region:</strong> {selectedRecipe.Region}</p>
      <p><strong>Continent:</strong> {selectedRecipe.Continent}</p>
      <div className="flex space-x-4 mt-4"> {/* Add space between buttons */}
        <button
          className="w-full bg-tertiary text-white px-4 py-2 rounded"
          onClick={() => window.open(selectedRecipe.url, "_blank")}
        >
          Watch Recipe
        </button>
        <button
          className="w-full bg-red-500 text-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
