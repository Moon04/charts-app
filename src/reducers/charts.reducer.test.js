import { FETCH_CHARTS, ADD_CHART } from "../actions/types";
import chartsReducer from './charts';

describe('Charts Reducer', ()=>{
    it('Should return default state', ()=>{
        const newState = chartsReducer(undefined, {});
        expect(newState).toEqual([]);
    });

    it('Should return new state if receiving action type FETCH_CHARTS', ()=>{
        const charts = [
            {
                id: "t1",
                title: "Test 1",
                data: [
                    {
                        name: "2020-04-25",
                        Count: "16"
                    }
                ]
            },
            {
                id: "t2",
                title: "Test 2",
                data: [
                    {
                        name: "2020-04-25",
                        Count: "16"
                    }
                ]
            }
        ];
        const newState = chartsReducer(undefined, {
            type: FETCH_CHARTS,
            charts: charts
        });
        expect(newState).toEqual(charts);
    });

    it('Should return new state if receiving action type ADD_CHART', ()=>{
        const chart = {
                id: "t1",
                title: "Test 1",
                data: [
                    {
                        name: "2020-04-25",
                        Count: "16"
                    }
                ]
            };
        const newState = chartsReducer(undefined, {
            type: ADD_CHART,
            chart: chart
        });
        expect(newState).toEqual([chart]);
    });
});