import React from 'react';
import "./ProgressChartComponent.scss";

const ProgressChartComponent = (props) => {

    return <div className="progressChartComponentContainer">
        {props.percentage.map((p, i) => {
            return <div className="progressChartElement" key={i + "p"}
                        onClick={() => props.changeShowedList(i)}>
                <div className="progressChartBar"
                     style={{
                         backgroundImage: "linear-gradient(to top, #99C2EE, #2EE7C5 "
                             + (props.percentage[i] - 0.01) + "%, #E5E5E5 " + props.percentage[i] + "%)"
                     }}/>
                <div className="progressChartBarTitle">Lista {i+1}</div>
            </div>
        })}
    </div>;
};

export default ProgressChartComponent;