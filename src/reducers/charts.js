import { FETCH_CHARTS, ADD_CHART } from "../actions/types";

export default function charts(state = [], action) {
  switch (action.type) {
    case FETCH_CHARTS:
      return [
        ...state,
        ...action.charts,
      ];
    case ADD_CHART:
      return [
        ...state,
        { ...action.chart }
      ];
    default:
      return state;
  }
}
