const initialState = {
  meals: [],
  loading: false,
  error: null
};

export default function mealReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MEALS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_MEALS_SUCCESS':
      return {
        ...state,
        loading: false,
        meals: action.payload.meals
      };
    case 'FETCH_MEALS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        meals: []
      };
    default:
      return state;
  }
}