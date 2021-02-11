import React from 'react';
import { ToastContainer } from 'react-toastify';
import Nav from './Nav';
import ChartsList from './ChartsList';

const InternalDashboard = ({history})=>{
    const handleAddChartBtn = ()=>{
        history.push("/add-chart");
    };

    return(
        <>
            <Nav handleAddChartBtn={handleAddChartBtn}/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            <ChartsList/>
        </>
    );
};

export default InternalDashboard;
