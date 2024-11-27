import React, { useState, useEffect } from 'react';

const BreedTracker = ({onBreedSelect}) => {
  const [breeds, setBreeds] = useState([]); 

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await res.json();
        const breedNames = Object.keys(data.message);
        setBreeds(breedNames);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, []);

  const handleBreedChange = (e) => {
  const breed =e.target.value;
    onBreedSelect(breed);
  };

  return (
    <div className='selectBox'>
      
      <label htmlFor="breeds">Make a Selection: </label>
      <select
        id="breeds"
        onChange={handleBreedChange}
      >
        <option value="">-- Dog Breeds --</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
            
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default BreedTracker;