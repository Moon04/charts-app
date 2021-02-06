import React from "react";
import { connect } from "react-redux";
import Chart from "./Chart";

const ChartsList = ({ charts }) => {
  return (
    <div className="row mt-4">
      {
        charts !== null &&
        charts?.map((chart) => <Chart key={chart.id} chart={chart} />)
      }
    </div>
  );
};

function mapStateToProps({ charts }) {
  return {
    charts,
  };
}

export default connect(mapStateToProps)(ChartsList);
