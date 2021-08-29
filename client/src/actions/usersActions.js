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
import { getPage } from "./pageActions";
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

// Register user
export const register = registration => dispatch => {
    axios.post("/api/users/register", registration)
        .then(res => 
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login user
export const login = profile => dispatch => {
    axios.post("/api/users/login", profile)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(getPage("grocery-list"))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout user
export const logout = () => dispatch => {
    dispatch(getPage("welcome"))
    dispatch({
        type: LOGOUT_SUCCESS
    })
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