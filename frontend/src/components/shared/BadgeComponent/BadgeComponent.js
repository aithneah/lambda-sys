import React from 'react';
import "./BadgeComponent.scss";

const BadgeComponent = (props) =>
    <div className={"badgeContainer" + " " + props.style}>
        {props.number}
    </div>;

export default BadgeComponent;