import { showLoading, hideLoading } from "react-redux-loading";
import { saveChart, getAllCharts } from "../utils/api";

export const FETCH_CHARTS = "FETCH_CHARTS";
export const ADD_CHART = "ADD_CHART";

function fetchCharts(charts) {
  return {
    type: FETCH_CHARTS,
    charts,
  };
}

function addChart(chart) {
  return {
    type: ADD_CHART,
    chart,
  };
}

export function handleFetchCharts() {
  return (dispatch) => {
    dispatch(showLoading());
    return getAllCharts().then(({ charts }) => {
      dispatch(hideLoading());
      dispatch(fetchCharts(charts));
    });
  };
}

export function handleAddChart(chartData) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveChart({
      ...chartData,
    })
      .then((chart) => dispatch(addChart(chart)))
      .then(() => dispatch(hideLoading()));
  };
}
