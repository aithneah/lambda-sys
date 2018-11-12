import React from 'react';
import './CircleComponent.scss';
import LoginComponent from './LoginComponent/LoginComponent';
import CommentComponent from './CommentComponent/CommentComponent';

const CircleComponent = (props) => {
    let content = null;

    switch (props.route) {
        case 'login':
            content = <LoginComponent/>;
            break;
        case 'comment':
            content = <CommentComponent/>
        default:
            content = <CommentComponent/>;
    }

    return <div className={"circleComponent"}>{content}</div>;
};

export default CircleComponent;