import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import charts from "./charts";

export default combineReducers({
  charts,
  loadingBar: loadingBarReducer
});
