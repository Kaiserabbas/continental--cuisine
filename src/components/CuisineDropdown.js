import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMeals } from '../actions/mealActions';

function CuisineDropdown() {
  const [cuisine, setCuisine] = useState('Indian');
  const dispatch = useDispatch();

  const handleCuisineChange = (e) => {
    const selectedCuisine = e.target.value;
    setCuisine(selectedCuisine);
    dispatch(fetchMeals(selectedCuisine));
  };

  return (
    <div>
      <label>Select Cuisine: </label>
      <select value={cuisine} onChange={handleCuisineChange}>
        <option value='Indian'>Indian</option>
        <option value='American'>American</option>
        <option value='Mexican'>Mexican</option>
        <option value='Canadian'>Canadian</option>
      </select>
    </div>
  );
}

export default CuisineDropdown;
