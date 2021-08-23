import axios from "axios";
import { 
    RECIPES_LOADED,
    RECIPES_LOADING,
    UPDATE_RECIPE,
    ADD_RECIPE,
    DELETE_RECIPE,
    CLEAR_RECIPES
} from "./types";
import { tokenConfig } from "./usersActions";
import { returnErrors } from "./errorsActions";

export const getRecipes = userId => (dispatch, getState) => {
    dispatch(recipesLoading());
    const config = tokenConfig(getState);
    config.params = { userId: userId };
    axios.get("/api/recipes", config)
        .then(res => 
            dispatch({
                type: RECIPES_LOADED,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const recipesLoading = () => {
    return {
        type: RECIPES_LOADING
    }
}

export const updateRecipe = recipe => dispatch => {
    axios.put("/api/recipes/update", recipe)
        .then(res => 
            dispatch({
                type: UPDATE_RECIPE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const addRecipe = recipe => dispatch => {
    axios.post("/api/recipes/add", recipe)
        .then(res => 
            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const deleteRecipe = recipe => dispatch => {
    axios.delete("/api/recipes/delete", { data: recipe })
        .then(res => 
            dispatch({
                type: DELETE_RECIPE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const clearRecipes = () => {
    return {
        type: CLEAR_RECIPES
    }
}