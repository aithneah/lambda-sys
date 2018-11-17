import React from 'react';
import "./ProgressChartComponent.scss";

const ProgressChartComponent = (props) => {

    return <div className="progressChartComponentContainer">
        <div className="progressChartElement">
        <div className="progressChartBar"
             style={{
                 backgroundImage: "linear-gradient(to top, #99C2EE, #2EE7C5 "
                     + (props.percentage[0] - 0.01) + "%, #E5E5E5 " + props.percentage[0] + "%)"
             }}/>
        <div className="progressChartBarTitle">Lista 1</div>
    </div>
        <div className="progressChartElement">
            <div className="progressChartBar"
                 style={{
                     backgroundImage: "linear-gradient(to top, #99C2EE, #2EE7C5 "
                         + (props.percentage[1] - 0.01) + "%, #E5E5E5 " + props.percentage[1] + "%)"
                 }}/>
            <div className="progressChartBarTitle">Lista 2</div>
        </div>
        <div className="progressChartElement">
            <div className="progressChartBar" style={{
                backgroundImage: "linear-gradient(to top, #99C2EE, #2EE7C5 "
                    + (props.percentage[2] - 0.01) + "%, #E5E5E5 " + props.percentage[2] + "%)"
            }}/>
            <div className="progressChartBarTitle">Lista 3</div>
        </div>
    </div>;
};

export default ProgressChartComponent;