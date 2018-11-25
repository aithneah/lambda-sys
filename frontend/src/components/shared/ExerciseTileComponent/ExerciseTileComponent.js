import React from 'react';
import "./ExerciseTileComponent.scss";
import {Icon, Popover} from 'antd';

const ExerciseTileComponent = (props) => {
        const content = <div className={"exerciseTileContainer " + props.type}>
            {props.tick && <div className="exerciseTileTick"><Icon type="check"/></div>}
        </div>;

    const popoverContent = <div className={"exerciseTilePopoverContent"}>{props.exerciseDetails}</div>;

        return props.type === 'exercise-partially' ? <Popover style={{whiteSpace: "pre-line"}} content={popoverContent}
                                                             placement="bottomRight">
            {content}
        </Popover> : content
    }
;

export default ExerciseTileComponent;