import React from 'react';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import "./SettingsComponent.scss";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";

const SettingsComponent = (props) => {
    return <RectangularContainer title="Ustawienia">
        <div className="settingsComponentTitle">Twoje dane</div>
        <table className="settingsComponentTable">
            <tbody>
            <tr>
                <th>Imię i nazwisko:</th>
                <td>{props.account.name}</td>
            </tr>
            <tr>
                <th>Nr indeksu:</th>
                <td>{props.account.index}</td>
            </tr>
            <tr>
                <th>Adres e-mail:</th>
                <td>{props.account.index + "@student.pwr.edu.pl"}</td>
            </tr>
            <tr>
                <th>Termin zajęć:</th>
                <td>{props.account.course}</td>
            </tr>
            </tbody>
        </table>
        <div className="settingsComponentButtons"><ButtonComponent title="Resetuj hasło" type="buttonGradient"
                                                                   fontsize="2.3vh"/></div>
    </RectangularContainer>
};

export default SettingsComponent;