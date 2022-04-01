import { combineReducers } from "redux";
import propertyReducer from "./propertyReducer";

export default combineReducers({
  property: propertyReducer
});
