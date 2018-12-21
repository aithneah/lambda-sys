import React, {Component} from 'react';
import {Input, message, Button} from 'antd';
import './LoginComponent.css';
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import CircleComponent from '../../../shared/CircleContainer/CircleContainer';
import {withRouter} from "react-router-dom";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            shouldValidate: false
        }
    }

    render() {

        let logIn = () => {
            if (this.state.login === "prowadzący") {
                this.props.logAsSupervisor();
                this.props.history.push("/home");
            } else if (this.state.login !== "") {
                this.props.getAccountData(this.state.login);
            } else {
                message.error('Niepoprawny login lub hasło');
            }
        };

        return <CircleComponent
            headerText="Zaloguj się, aby skorzystać z serwisu"
            footerText="Zapomniałeś hasła? Klinij tutaj, aby zresetować hasło.">
            <div className="loginComponentForm">
                <div className="loginComponentFormElement">
                    <div className="loginComponentLabel">Login:</div>
                    <Input size="large" placeholder='Wprowadź login' onChange={(e) => this.setState({login: e.target.value})}/>
                </div>
                <div className="loginComponentFormElement">
                    <div className="loginComponentLabel">Hasło:</div>
                    <Input size="large" type="password" placeholder='Wprowadź hasło' onPressEnter={logIn}/>
                </div>
                <div className="loginComponentButton">
                    <ButtonComponent title="Zaloguj" type="buttonGradient" fontsize="2.5vh" onClick={logIn}/>
                </div>
            </div>
        </CircleComponent>;
    }
};

export default withRouter(LoginComponent);