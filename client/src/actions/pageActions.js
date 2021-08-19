import { PAGE_LOADING, PAGE_LOADED } from "./types";

export const getPage = (page) => dispatch => {
    dispatch(pageLoading());
    dispatch({
        type: PAGE_LOADED,
        payload: page
    })
}

export const pageLoading = () => {
    return {
        type: PAGE_LOADING
    }
}