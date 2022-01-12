import { combineReducers } from "redux";
import article from "./articleReducer";
import loading from "./loadingReducer";

export default combineReducers({
    // Add reducers
    article,
    loading
})