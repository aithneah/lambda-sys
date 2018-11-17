import React from 'react';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import "./SettingsComponent.scss";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";

const SettingsComponent = (props) => {
  return <RectangularContainer title="Ustawienia">
      <div className="settingsComponentTitle">Twoje dane</div>
      <table className="settingsComponentTable">
          <tr>
              <th>Imię i nazwisko:</th>
              <td>Mariusz Kot</td>
          </tr>
          <tr>
              <th>Nr indeksu:</th>
              <td>226735</td>
          </tr>
          <tr>
              <th>Adres e-mail:</th>
              <td>226735@student.pwr.edu.pl</td>
          </tr>
          <tr>
              <th>Termin zajęć:</th>
              <td>Poniedziałek TP 17:05</td>
          </tr>
      </table>
      <div className="settingsComponentButtons"><ButtonComponent title="Resetuj hasło" style="buttonGradient" fontsize="2.3vh"/></div>
  </RectangularContainer>
};

export default SettingsComponent;