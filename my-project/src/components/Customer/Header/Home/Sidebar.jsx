import React, { useState } from 'react';

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


const FilterComponent = () => {
  
  const [selectedContinent, setSelectedContinent] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 10100]);

  const handleBrandChange = (event) => {
    const brand = event.target.name;
    setSelectedContinent((prevSelectedContinent) =>
      prevSelectedContinent.includes(brand)
        ? prevSelectedContinent.filter((b) => b !== brand)
        : [...prevSelectedContinent, brand]
    );
  };

  const handlePriceChange = (event) => {
    const value = parseInt(event.target.value);
    setPriceRange([priceRange[0], value]);
  };

  return (
    <div className="w-1/4 p-4 drop-shadow-lg shadow-lg rounded-lg h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Continent</h2>
      <div className="space-y-2">
        {Continent.map((brand) => (
          <label key={brand.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={brand.name}
              checked={selectedContinent.includes(brand.name)}
              onChange={handleBrandChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700 text-sm">
              {brand.name} ({brand.count})
            </span>
          </label>
        ))}
        <button className="text-blue-600 text-sm mt-2"></button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Region</h2>
      <div className="space-y-2">
        {Region.map((brand) => (
          <label key={brand.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={brand.name}
              checked={selectedRegion.includes(brand.name)}
              onChange={handleBrandChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700 text-sm">
              {brand.name} ({brand.count})
            </span>
          </label>
        ))}
        <button className="text-blue-600 text-sm mt-2"></button>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-4">Energy</h2>
      <div className="space-y-2">
        <input
          type="range"
          min="100"
          max="10100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-sm text-gray-700">{`₹${priceRange[0]} - ₹${priceRange[1]}+`}</div>
      </div>
    </div>
  );
};

export default FilterComponent;
