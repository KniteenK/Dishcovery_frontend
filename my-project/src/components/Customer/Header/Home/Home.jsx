import { Checkbox, CheckboxGroup, Slider } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";

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

  const handleSearch = async () => {
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
      console.log("API Response:", response.data.data.payload.data);
      setFilteredRecipes(response.data.data.payload.data || []);
    } catch (error) {
      console.error("An error occurred while fetching recipes:", error);
      setFilteredRecipes([]);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4 rounded-lg h-screen overflow-y-auto fixed">
        <h2 className="text-lg font-semibold mb-4">Continent</h2>
        <CheckboxGroup
          label="Select One Continent"
          color="warning"
          value={selectedContinent}
          onValueChange={(value) => {
            setSelectedContinent(value.length > 1 ? [value[value.length - 1]] : value);
          }}
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
          onValueChange={(value) => {
            setSelectedRegion(value.length > 1 ? [value[value.length - 1]] : value);
          }}
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
          <div className="flex items-center shadow-md bg-white rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for a recipe..."
              className="p-4 flex-grow text-gray-700 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-secondary text-white px-6 py-4 rounded-r-full"
              onClick={handleSearch}
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
                <div className="border rounded-lg p-4 shadow-md bg-white h-full flex flex-col justify-between">
                  <img src={recipe.img_url} alt={recipe.Recipe_title} className="w-full h-auto rounded-lg mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{recipe.Recipe_title}</h3>
                  <p><strong>Protein:</strong> {recipe["Protein (g)"]}g</p>
                  <p><strong>Fat:</strong> {recipe["Total lipid (fat) (g)"]}g</p>
                  <p><strong>Carbohydrate:</strong> {recipe["Carbohydrate, by difference (g)"]}g</p>
                  <p><strong>Energy:</strong> {recipe["Energy (kcal)"]} kcal</p>
                  <p><strong>Vegan:</strong> {recipe.vegan === "1.0" ? "Yes" : "No"}</p>
                  <p><strong>Total Time:</strong> {recipe.total_time} minutes</p>
                  <p><strong>Region:</strong> {recipe.Region}</p>
                  <p><strong>Continent:</strong> {recipe.Continent}</p>
                  <button
                    className="bg-tertiary text-white px-4 py-2 rounded mt-2"
                    onClick={() => window.open(recipe.url, "_blank")}
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
    </div>
  );
};

export default Home;