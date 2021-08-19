import axios from "axios";
import { 
    RECIPES_LOADED,
    RECIPES_LOADING,
    ADD_RECIPE,
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

export const clearRecipes = () => {
    return {
        type: CLEAR_RECIPES
    }
}