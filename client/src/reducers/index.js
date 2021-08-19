import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import usersReducer from "./usersReducer";
import errorsReducer from "./errorsReducer";
import pageReducer from "./pageReducer";
import recipesReducer from "./recipesReducer";

export default combineReducers({
    page: pageReducer,
    items: itemsReducer,
    recipes: recipesReducer,
    users: usersReducer,
    errors: errorsReducer
});