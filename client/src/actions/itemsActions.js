import axios from "axios";
import { 
    GET_ITEMS,
    ITEMS_LOADING,
    UPDATE_ITEM,
    ADD_ITEM,
    DELETE_ITEM,
    FOUND_ITEM,
    RESET_FOUND_ITEMS,
    TOGGLE_SHOPPING_MODE
} from "./types";

export const getItems = () => dispatch => {
    dispatch(itemsLoading());
    axios.get("/api/items")
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
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
}

export const addItem = item => dispatch => {
    axios.post("/api/items/add", item)
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
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
}

export const foundItem = item => dispatch => {
    axios.put("/api/items/found", item)
        .then(res => 
            dispatch({
                type: FOUND_ITEM,
                payload: res.data
            })
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
}

export const toggleShoppingMode = () => {
    return {
        type: TOGGLE_SHOPPING_MODE
    }
}