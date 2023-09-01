import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Meals from './components/Meals';
import CuisineDropdown from './components/CuisineDropdown';

import './styles.css';


function App() {
  const handleCuisineChange = (selectedCuisine) => {
    const FOOD_BASE_URL = `https://themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}`;
    console.log(FOOD_BASE_URL);
  };
  return (
    <Provider store={store}>
      <div className='app'>
              <CuisineDropdown onCuisineChange={handleCuisineChange} />

        <h1>Fusion  Bites Resturant</h1>

        <Meals />
      </div>
    </Provider>
  );
}

export default App;
