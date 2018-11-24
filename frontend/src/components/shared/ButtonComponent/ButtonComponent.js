import React from 'react';
import {Icon} from 'antd';
import './ButtonComponent.scss';

const ButtonComponent = (props) => {
    return <div className={'buttonContainer ' + props.type}
                onClick={props.onClick}
                style={{fontSize: props.fontsize}}>
        {props.icon ?
            <div className={'buttonIcon'}>
                <Icon type={props.icon}/>
            </div>
            : null}
        <div className={'buttonText'}>
            {props.title}
        </div>
    </div>
};

export default ButtonComponent;