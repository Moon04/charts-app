import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import axios from "axios";

import InternalDashboard from "./components/InternalDashboard";
import chartsReducer from "./reducers/charts";
import { handleAddChart, handleFetchCharts } from "./actions/charts";
import { FETCH_CHARTS, ADD_CHART } from "./actions/types";

const mock = new MockAdapter(axios);

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});
const chart = {
  id: "1",
  title: "Owned posts over time",
  data: [
    {
      name: "2020-04-03",
      Count: 0,
    },
    {
      name: "2020-04-04",
      Count: 17,
    },
  ],
};
const baseUrl =
  "https://my-json-server.typicode.com/moon04/charts-app-api-server";

describe("Test API Calls", () => {
  beforeEach(() => {
    mock.reset();
    store.clearActions();
  });

  it("Should create an action to add new chart successfully", async () => {
    const expectedActions = [
      { type: "loading-bar/SHOW", payload: { scope: "default" } },
      {
        type: ADD_CHART,
        chart: { ...chart },
      },
      { type: "loading-bar/HIDE", payload: { scope: "default" } },
    ];

    mock.onPost(baseUrl + "/charts", { ...chart }).reply(200, { ...chart });

    const data = await store.dispatch(handleAddChart(chart));
    const receivedActions = store.getActions();
    expect(receivedActions).toEqual(expectedActions);
  });

  it("Should display an alert when adding new chart but get status 500", async () => {
    const expectedActions = [
      { type: "loading-bar/SHOW", payload: { scope: "default" } },
      { type: "loading-bar/HIDE", payload: { scope: "default" } },
    ];

    mock.onPost(baseUrl + "/charts", { ...chart }).reply(500);

    const data = await store.dispatch(handleAddChart(chart));
    const receivedActions = store.getActions();
    expect(receivedActions).toEqual(expectedActions);

    const dashboardComponent = shallow(<InternalDashboard />);
    const alertWrapper = await dashboardComponent.find("[role='alert']");
    expect(alertWrapper.length).toEqual(1);
  });

  it("Should create an action to fetch all charts successfully", async () => {
    const expectedActions = [
      { type: "loading-bar/SHOW", payload: { scope: "default" } },
      {
        type: FETCH_CHARTS,
        charts: [{ ...chart }],
      },
      { type: "loading-bar/HIDE", payload: { scope: "default" } },
    ];

    mock.onGet(baseUrl + "/charts").reply(200, [{ ...chart }]);

    const data = await store.dispatch(handleFetchCharts());
    const receivedActions = store.getActions();
    expect(receivedActions).toEqual(expectedActions);
  });

  it("Should display an alert when fetching all charts but get status 500", async () => {
    const expectedActions = [
      { type: "loading-bar/SHOW", payload: { scope: "default" } },
      { type: "loading-bar/HIDE", payload: { scope: "default" } },
    ];

    mock.onGet(baseUrl + "/charts").reply(500);

    const data = await store.dispatch(handleFetchCharts());
    const receivedActions = store.getActions();
    expect(receivedActions).toEqual(expectedActions);

    const dashboardComponent = shallow(<InternalDashboard />);
    const alertWrapper = await dashboardComponent.find("[role='alert']");
    expect(alertWrapper.length).toEqual(1);
  });
});

describe("Test Charts Reducer", () => {
  it("Should return default state", () => {
    const newState = chartsReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it("Should return new state if receiving action type FETCH_CHARTS", () => {
    const charts = [
      {
        id: "t1",
        title: "Test 1",
        data: [
          {
            name: "2020-04-25",
            Count: "16",
          },
        ],
      },
      {
        id: "t2",
        title: "Test 2",
        data: [
          {
            name: "2020-04-25",
            Count: "16",
          },
        ],
      },
    ];
    const newState = chartsReducer(undefined, {
      type: FETCH_CHARTS,
      charts: charts,
    });
    expect(newState).toEqual(charts);
  });

  it("Should return new state if receiving action type ADD_CHART", () => {
    const chart = {
      id: "t1",
      title: "Test 1",
      data: [
        {
          name: "2020-04-25",
          Count: "16",
        },
      ],
    };
    const newState = chartsReducer(undefined, {
      type: ADD_CHART,
      chart: chart,
    });
    expect(newState).toEqual([chart]);
  });
});
