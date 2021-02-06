import axios from "axios";

const baseUrl = "https://my-json-server.typicode.com/moon04/charts-app-api-server";

export const getAllCharts = ()=>{
    return axios.get(baseUrl + "/charts");
}


export const saveChart = (chartData)=>{
    return axios.post(baseUrl + "/charts", {...chartData});
}