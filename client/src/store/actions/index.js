import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const ORDER_BY = 'ORDER_BY';
export const GET_BY_FIND ='GET_BY_FIND';
export const RESET_RECIPE_DETAIL = 'RESET_RECIPE_DETAIL';
export const ERROR = 'ERROR';
export const RESET_ERROR  = 'RESET_ERROR';
const { REACT_APP_API } = process.env
export const getRecipes = ()=> {
    return function(dispatch) {
        axios.get(REACT_APP_API+"/api/recipes")
        .then(response => {
            dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        })    
        .catch((err) => {console.log(err)});     
    };
};

export const getRecipeDetail = (id)=> {
    return function(dispatch) {
        axios.get(REACT_APP_API+"/api/recipes/"+id)
        .then(response => {
            dispatch({
                type: GET_RECIPE_DETAIL,
                payload: response.data
            })
        })
        .catch((err) => {dispatch({
            type: ERROR,
            payload: [err,"Error Detail"]
        })});  
    }

}
export const resetRecipeDetail = ()=> {    
    return{
        type: RESET_RECIPE_DETAIL,   
    }   
}


export const getDiets = ()=> {
    return function(dispatch) {
        axios.get(REACT_APP_API+"/api/types")
        .then(response => {
            dispatch({
                type: GET_DIETS,
                payload: response.data
            })
        })
        .catch((err) => {console.log(err)});    
    }

}

export const addNewRecipe = (input)=> {
    return function(dispatch) {
       axios.post(REACT_APP_API+"/api/recipes", input)
        .then(response => {
            dispatch({
              type: ADD_NEW_RECIPE,
              payload: response
            })
        })
        .catch((err) => {console.log(err)});     
    }
}

export const orderBy = (recipes)=> {    
    return{
        type: ORDER_BY,   
        payload: recipes
    }   
}

export const getByFind = (name)=> {
    return function(dispatch){
        axios.get(REACT_APP_API+"/api/recipes?name="+name)
        .then(response => {
            dispatch({
                type: GET_BY_FIND,
                payload: response.data
            })
        })    
        .catch((err) => {dispatch({
            type: ERROR,
            payload: [err,"Error Find"]
        })});     
    };
};
export const resetError = ()=> {
    return{
        type: RESET_ERROR   
    }   
}