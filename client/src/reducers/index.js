import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import usersReducer from "./usersReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
    itemsList: itemsReducer,
    users: usersReducer,
    errors: errorsReducer
});