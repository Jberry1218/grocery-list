import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";
import { returnErrors } from "./errorsActions";
import axios from "axios";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    
    dispatch(userLoading());

    axios.get("/api/users", tokenConfig(getState))
        .then(res => 
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            }) 
        })
}

export const userLoading = () => {
    return {
        type: USER_LOADING
    }
}

// Setup config / headers and token
export const tokenConfig = getState => {
    const token = getState().users.token;

    const config = {
        headers: {
            "Content-type": "applications/json"
        }
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
}