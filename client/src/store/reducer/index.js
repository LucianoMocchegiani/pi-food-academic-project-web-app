import {ADD_NEW_RECIPE, GET_DIETS, GET_RECIPES, GET_RECIPE_DETAIL, ORDER_BY, GET_BY_FIND} from '../actions'
const initialState = {
  recipes: [],
  //recipesPage: [],
  recipeDetail: [],
  diets: []
};


function reducer(state = initialState, action){
  switch(action.type){
    case GET_RECIPES: return {...state, recipes: action.payload};
    case GET_RECIPE_DETAIL: return {...state, recipeDetail: action.payload};
    case ADD_NEW_RECIPE: return state;
    case GET_DIETS: return {...state, diets: action.payload};
    case ORDER_BY: return {...state, recipes: action.payload};
    case GET_BY_FIND: return {...state, recipes: action.payload};
    //case GET_DIETS: return {...state, moviesFavourites:  state.moviesFavourites.filter((movie)=>movie !== action.payload)};
    default: return state
  }
}
export default reducer;