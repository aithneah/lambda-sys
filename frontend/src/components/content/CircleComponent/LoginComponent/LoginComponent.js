import React from 'react';
import './LoginComponent.css';

const LoginComponent = (props) => {
    return <div className="loginComponent">
        <div className="loginComponentHeader">
            Zaloguj się, aby skorzystać z serwisu
        </div>
        <form className="loginComponentForm">
            <label className="loginComponentFormElement">Login: <input className="textInput" type="text" name="login"/></label>
            <label className="loginComponentFormElement">Hasło: <input className="textInput" type="password" name="haslo"/></label>
            <input className="submit" type="submit" value="Submit"/>
        </form>
        <div className="loginComponentAdditionalInfo">
            Zapomniałeś hasła? Klinij tutaj, aby zresetować hasło.
        </div>

    </div>;
};

export default LoginComponent;