import React from 'react';
import './CircleContainer.scss';

const CircleContainer = (props) =>
    <div className={"circleContainer"}>
        {props.headerText && <div className="circleContainerHeader">{props.headerText}</div>}
        {props.children}
        {props.footerText && <div className="circleContainerFooter">{props.footerText}</div>}
    </div>;

export default CircleContainer;