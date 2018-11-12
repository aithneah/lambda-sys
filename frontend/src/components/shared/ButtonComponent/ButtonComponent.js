import React from 'react';
import { Icon } from 'antd';
import './ButtonComponent.css';

const ButtonComponent = (props) => {
  return <div className={'buttonContainer' + ' ' + props.style} onClick={props.onClick} style={{fontSize: props.fontsize}}>
      {props.icon ? <div className={'buttonIcon'}>
          <Icon type={props.icon} />
      </div> : null}
      <div className={'buttonText'}>
          {props.title}
      </div>
        </div>
};

export default ButtonComponent;