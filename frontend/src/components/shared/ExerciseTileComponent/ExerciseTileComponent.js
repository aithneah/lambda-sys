import React from 'react';
import "./ExerciseTileComponent.scss";
import {Icon, Popover} from 'antd';

const ExerciseTileComponent = (props) => {
        const content = <div className={"exerciseTileContainer " + props.type}>
            {props.tick && <div className="exerciseTileTick"><Icon type="check"/></div>}
        </div>;

        return props.style === 'exerciseHalfDone' ? <Popover content={props.exerciseDetails}
                                                             placement="bottomRight">
            {content}
        </Popover> : content
    }
;

export default ExerciseTileComponent;