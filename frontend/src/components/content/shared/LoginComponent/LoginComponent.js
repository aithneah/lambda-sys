import React from 'react';
import {Input} from 'antd';
import './LoginComponent.css';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import CircleComponent from '../../../shared/CircleContainer/CircleContainer';

const LoginComponent = (props) => {
    return <CircleComponent
        headerText="Zaloguj się, aby skorzystać z serwisu"
        footerText="Zapomniałeś hasła? Klinij tutaj, aby zresetować hasło.">
        <div className="loginComponentForm">
            <div className="loginComponentFormElement">
                <div className="loginComponentLabel">Login:</div>
                <Input size="large" placeholder='Wprowadź login'/>
            </div>
            <div className="loginComponentFormElement">
                <div className="loginComponentLabel">Hasło:</div>
                <Input size="large" placeholder='Wprowadź hasło'/>
            </div>
            <div className="loginComponentButton">
                <ButtonComponent title="Zaloguj" type="buttonGradient" fontsize="2.5vh" onClick={props.getAccountData}/>
            </div>
        </div>
    </CircleComponent>;
};

export default LoginComponent;