import React from 'react';
import "./BadgeComponent.scss";

const BadgeComponent = (props) =>
    <div className={"badgeContainer " + props.type}>
        {props.number}
    </div>;

export default BadgeComponent;