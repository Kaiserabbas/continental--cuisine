export const fetchMeals = (cuisine = 'Indian') => {
  return dispatch => {
    dispatch(fetchMealsRequest());
    const FOOD_BASE_URL = `https://themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`;
    fetch(FOOD_BASE_URL)
      .then(response => response.json())
      .then(data => dispatch(fetchMealsSuccess(data.meals)))
      .catch(error => dispatch(fetchMealsFailure(error)));
  };
};

export const fetchComments = (mealId) => {
  return dispatch => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${mealId}/comments`)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: { mealId, comments: data } }))
      .catch(error => dispatch({ type: 'FETCH_COMMENTS_FAILURE', payload: { error } }));
  };
};

export const fetchMealsRequest = () => {
  return {
    type: 'FETCH_MEALS_REQUEST'
  };
};

export const fetchMealsSuccess = meals => {
  return {
    type: 'FETCH_MEALS_SUCCESS',
    payload: { meals }
  };
};

export const fetchMealsFailure = error => {
  return {
    type: 'FETCH_MEALS_FAILURE',
    payload: { error }
  };
};

export const likeMeal = (mealId) => {
  return {
    type: 'LIKE_MEAL',
    payload: { mealId }
  };
};
