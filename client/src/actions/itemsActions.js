import axios from "axios";
import { 
    ITEMS_LOADING,
    ITEMS_LOADED,
    UPDATE_ITEM,
    ADD_ITEM,
    DELETE_ITEM,
    FOUND_ITEM,
    RESET_FOUND_ITEMS,
    TOGGLE_SHOPPING_MODE
} from "./types";
import { tokenConfig } from "./usersActions";
import { returnErrors } from "./errorsActions";

export const getItems = () => (dispatch, getState) => {
    dispatch(itemsLoading());
    axios.get("/api/items", tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ITEMS_LOADED,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const itemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const updateItem = item => dispatch => {
    axios.put("/api/items/update", item)
        .then(res => 
            dispatch({
                type: UPDATE_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const addItem = item => dispatch => {
    axios.post("/api/items/add", item)
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const deleteItem = item => dispatch => {
    axios.delete("/api/items/delete", { data: item })
        .then(res => 
            dispatch({
                type: DELETE_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const foundItem = item => dispatch => {
    axios.put("/api/items/found", item)
        .then(res => 
            dispatch({
                type: FOUND_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const resetFoundItems = () => dispatch => {
    axios.put("/api/items/foundreset")
        .then(res => 
            dispatch({
                type: RESET_FOUND_ITEMS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const toggleShoppingMode = () => {
    return {
        type: TOGGLE_SHOPPING_MODE
    }
}