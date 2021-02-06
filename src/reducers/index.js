import { combineReducers } from "redux";
import charts from "./charts";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  charts,
  loadingBar: loadingBarReducer,
});
