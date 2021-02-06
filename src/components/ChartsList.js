import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Chart from "./Chart";

const ChartsList = ({ charts }) => {
  return (
    <div className="row mt-4" style={{height: charts.length > 0? "inherit":"83vh"}}>
      {
        charts !== null && (
          charts.length > 0?
            charts.map((chart) => <Chart key={chart.id} chart={chart} />)
            :
            <p className="text-center m-auto p-4 rounded bg-white">No charts added yet, add new chart to display its data!</p>
        )
      }
    </div>
  );
};

ChartsList.protoTypes = {
  charts: PropTypes.array
};

function mapStateToProps({ charts }) {
  return {
    charts,
  };
}

export default connect(mapStateToProps)(ChartsList);
