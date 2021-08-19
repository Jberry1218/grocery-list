import { PAGE_LOADING, PAGE_LOADED } from "../actions/types";

const initialState = {
    page: null,
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PAGE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PAGE_LOADED:
            return {
                ...state,
                page: action.payload,
                isLoading: false,
            }
        default:
            return state;
    }
}