import { 
    RECIPES_LOADING,
    RECIPES_LOADED,
    ADD_RECIPE,
    CLEAR_RECIPES
} from "../actions/types";

const initialState = {
    recipes: [],
    loading: false
};

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
        case ADD_RECIPE:
            return {
                ...state,
                recipes: state.recipes.push(action.payload)
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