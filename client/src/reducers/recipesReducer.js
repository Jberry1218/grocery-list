import { 
    RECIPES_LOADING,
    RECIPES_LOADED,
    UPDATE_RECIPE,
    ADD_RECIPE,
    DELETE_RECIPE,
    CLEAR_RECIPES
} from "../actions/types";

const initialState = {
    recipes: [],
    loading: false
};

// Find index of recipe in recipe list
let findIndex = (state, recipeId) => {
    for (let i = 0; i < state.recipes.length; i++) {
      if (state.recipes[i]._id === recipeId) {
        return i;
      }
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case RECIPES_LOADING:
            return {
                ...state,
                loading: true
            }
        case RECIPES_LOADED:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            }
        case UPDATE_RECIPE: {
            let recipeInd = findIndex(state, action.payload._id);
            state.recipes[recipeInd] = action.payload;
            return {
                ...state
            }
        }
        case ADD_RECIPE:
            state.recipes.push(action.payload)
            return {
                ...state
            }
        case DELETE_RECIPE: {
            let recipeInd = findIndex(state, action.payload.id);
            state.recipes.splice(recipeInd, 1);
            return {
                ...state
            }
        }
        case CLEAR_RECIPES:
            return {
                ...state,
                recipes: []
            }
        default:
            return state;
    }
}