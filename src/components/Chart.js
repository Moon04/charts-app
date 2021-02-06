import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const Chart = () => {
  return (
    <div className="col-6 mb-3">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-secondary" tag="h5">Card title</CardTitle>
        </CardBody>
        <img width="100%" src="/assets/318x180.svg" alt="" />
      </Card>
    </div>
  );
};

export default Chart;
