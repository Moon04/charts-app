import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';

import InternalDashboard from "./InternalDashboard";
import NewChartForm from "./NewChartForm";
import { handleFetchCharts } from "../actions/charts";

class App extends Component {

  static propTypes  = {
    loading: PropTypes.bool
  };

  componentDidMount() {
    const { dispatch, loading } = this.props;
    if (loading === true) {
      dispatch(handleFetchCharts());
    }
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="app-container bg-light p-4">
            <div>
              <Route path="/" exact component={InternalDashboard} />
              <Route path="/add-chart" component={NewChartForm} />
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ charts }) {
  return {
    loading: charts.length === 0
  };
}

export default connect(mapStateToProps)(App);
