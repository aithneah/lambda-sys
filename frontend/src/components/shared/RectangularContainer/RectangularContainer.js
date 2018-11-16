import React from 'react';
import {Icon} from 'antd';
import './RectangularContainer.scss';

const RectangularContainer = (props) =>
    <div className="rectangularContainer">
        <div className="rectangularContainerHeader">
            <div className="rectangularContainerIconAndTitle">
                {props.icon && <div className="rectangularContainerIcon"><Icon type={props.icon}/></div>}
                <div className="rectangularContainerTitle">{props.title}</div>
            </div>
            {props.buttons && <div className="rectangularContainerButtons">{props.buttons()}</div>}
        </div>
        {props.children}
    </div>;

export default RectangularContainer;