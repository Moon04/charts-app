import React from 'react';
import Nav from './Nav';
import ChartsList from './ChartsList';

const InternalDashboard = ({history})=>{
    const handleAddChartBtn = ()=>{
        history.push("/add-chart");
    };

    return(
        <>
            <Nav handleAddChartBtn={handleAddChartBtn}/>
            <ChartsList/>
        </>
    );
};

export default InternalDashboard;
