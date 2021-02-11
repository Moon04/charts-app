import { toast } from 'react-toastify';
import { showLoading, hideLoading } from "react-redux-loading";

import { FETCH_CHARTS, ADD_CHART } from './types';
import { saveChart, getAllCharts } from "../utils/api";



function fetchCharts(charts) {
  return {
    type: FETCH_CHARTS,
    charts: [ ...charts ]
  };
}

function addChart(chart) {
  return {
    type: ADD_CHART,
    chart: { ...chart }
  };
}

export function handleFetchCharts() {
  return (dispatch) => {
    dispatch(showLoading());
    return getAllCharts()
            .then((res) => dispatch(fetchCharts([...res.data])))
            .then(()=> dispatch(hideLoading()))
            .catch((error)=>{
              dispatch(hideLoading());
                if (error.response && error.response.status === 500) {
                    toast.error("Something wrong happened, please try again.");
                } 
                else if (error.request) {
                  toast.error("Internet Connection Error! Try Again Later");
                } 
                else {
                  toast.error(error.message);
                }
            });
  };
}

export function handleAddChart(chartData) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveChart({
      ...chartData,
    })
      .then((res) => dispatch(addChart(res.data)))
      .then(() => dispatch(hideLoading()))
      .catch((error)=>{
        dispatch(hideLoading());
        if (error.response && error.response.status === 500) {
          toast.error("Something wrong happened, please try again.");
        } 
        else if (error.request) {
          toast.error("Internet Connection Error! Try Again Later");
        } 
        else {
          toast.error(error.message);
        }
      });
  };
}
