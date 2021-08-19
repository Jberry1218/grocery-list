import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import usersReducer from "./usersReducer";
import errorsReducer from "./errorsReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
    page: pageReducer,
    items: itemsReducer,
    users: usersReducer,
    errors: errorsReducer
});