import React from 'react';
import "./PercentageComponent.scss";

const PercentageComponent = (props) => {
    const gradient = "linear-gradient(to right, #99C2EE, #2EE7C5 " + (props.percentage - 0.01) + "%, #E5E5E5 " + props.percentage + "%)";
    const left = `calc(10% + 80% * ${props.percentage / 100} - 1vw)`;

    return <div className="percentageComponentContainer">
        <div className="percentageComponentBar" style={{backgroundImage: gradient}}/>
        <div className="percentageComponentPointer" style={{left: left}}>
            <div className="percentageComponentPointerTriangle"/>
            <div className="percentageComponentPointerNumber">{props.percentage}%</div>
        </div>
    </div>;
};

    export default PercentageComponent;