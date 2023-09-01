import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMeals } from '../actions/mealActions';
import logo from '../images/logo.png';

function CuisineDropdown() {
  const [cuisine, setCuisine] = useState('Indian');
  const dispatch = useDispatch();

  const handleCuisineChange = (e) => {
    const selectedCuisine = e.target.value;
    setCuisine(selectedCuisine);
    dispatch(fetchMeals(selectedCuisine));
  };

  return (
    <div className='navbar'>
     <img src={logo} alt='logo' className='logo' /> 
     <div className='cuisine'>
      <label className='label'>Select Cuisine: </label>
      <select value={cuisine} onChange={handleCuisineChange} className='select'>
        <option value='Indian' className='drop-list'>Pakistani</option>
        <option value='American' className='drop-list'>American</option>
        <option value='Mexican' className='drop-list'>Mexican</option>
        <option value='Canadian' className='drop-list'>Canadian</option>
      </select>
     </div>
    </div>
  );
}

export default CuisineDropdown;
