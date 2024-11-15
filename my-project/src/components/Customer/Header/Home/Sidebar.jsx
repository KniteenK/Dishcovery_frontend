import { Checkbox, CheckboxGroup, Slider } from '@nextui-org/react';
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

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [energy, setEnergy] = useState(70); // Initial value set to 70
  const [carbohydrate, setCarbohydrate] = useState(50); // Initial value set to 50
  const [protein, setProtein] = useState(30); // Initial value set to 30
  const [fat, setFat] = useState(20); // Initial value set to 20

  const handlePriceChange = (event) => {
    const value = parseInt(event.target.value);
    setPriceRange([priceRange[0], value]);
  };

  const handleEnergyChange = (value) => {
    setEnergy(value);
  };

  const handleCarbohydrateChange = (value) => {
    setCarbohydrate(value);
  };

  const handleProteinChange = (value) => {
    setProtein(value);
  };

  const handleFatChange = (value) => {
    setFat(value);
  };

  return (
    <div className="w-1/4 p-4  rounded-lg h-screen overflow-y-auto">
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
        onChange={handleEnergyChange}
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
        onChange={handleCarbohydrateChange}
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
        onChange={handleProteinChange}
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
        onChange={handleFatChange}
        aria-label="Fat"
        className="max-w-md"
      />
      <div className="mt-2 text-center">
        <span className="text-gray-700 text-sm">Fat: {fat}</span>
      </div>
    </div>
  );
};

export default FilterComponent;