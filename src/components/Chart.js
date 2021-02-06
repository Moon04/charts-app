import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

const Chart = ({ chart }) => {
  const xAxis = Object.keys(chart.data[0])[0];
  const yAxis = Object.keys(chart.data[0])[1];
  const barStyle = {
    data: { fill: "#2a15c8" },
  };

  const formatDate = (date) => {
    const dateValues = date.split("-");
    const formattedDate =
      dateValues[0][2] +
      dateValues[0][3] +
      "-" +
      dateValues[1] +
      "-" +
      dateValues[2];
    return formattedDate;
  };

  return (
    <div className="col-6 mb-3">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-secondary" tag="h5">
            {chart.title}
          </CardTitle>
        </CardBody>
        <VictoryChart
          height={250}
          width={400}
          theme={VictoryTheme.material}
          domainPadding={{ x: [-20, 20] }}
        >
          <VictoryAxis tickFormat={(x) => formatDate(x)} />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) =>
              y >= 1000000 ? `${y / 1000000}m` : y >= 1000 ? `${y / 1000}k` : y
            }
          />
          <VictoryBar
            barWidth={25}
            cornerRadius={2}
            style={barStyle}
            alignment="middle"
            data={chart.data}
            x={xAxis} // data accessor for x values
            y={yAxis} // data accessor for y values
          />
        </VictoryChart>
      </Card>
    </div>
  );
};

export default Chart;
