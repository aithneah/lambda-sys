import React from 'react';
import './GroupsComponent.scss';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";

const GroupsComponent = (props) =>
    <RectangularContainer
        title="Zarządzaj grupami"
        icon="team"
        buttons={() => <>
            <ButtonComponent title="Dodaj nowego studenta" type="buttonGradient" fontsize="2vh" />
            <ButtonComponent title="Dodaj nową grupę" type="buttonGradient" fontsize="2vh" />
        </>}>
        <table className="groupsComponentTable">
            <tr className="groupsComponentTableHeader">
                <th>Lp.</th>
                <th>Termin zajęć grupy</th>
                <th>Liczba zapisanych osób</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Poniedziałek TP 11:15</td>
                <td>18/18</td>
                <td className="groupsComponentTableButtons">
                    <ButtonComponent title="Przeglądaj postępy" type="buttonBlue" fontsize="1.5vh" />
                    <ButtonComponent title="Edytuj grupę" type="buttonGreen" fontsize="1.5vh" />
                    <ButtonComponent title="Usuń grupę" type="buttonRed" fontsize="1.5vh" />

                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>Poniedziałek TP 13:15</td>
                <td>17/18</td>
                <td className="groupsComponentTableButtons">
                    <ButtonComponent title="Przeglądaj postępy" type="buttonBlue" fontsize="1.5vh" />
                    <ButtonComponent title="Edytuj grupę" type="buttonGreen" fontsize="1.5vh" />
                    <ButtonComponent title="Usuń grupę" type="buttonRed" fontsize="1.5vh" />

                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>Poniedziałek TP 15:15</td>
                <td>18/18</td>
                <td className="groupsComponentTableButtons">
                    <ButtonComponent title="Przeglądaj postępy" type="buttonBlue" fontsize="1.5vh" />
                    <ButtonComponent title="Edytuj grupę" type="buttonGreen" fontsize="1.5vh" />
                    <ButtonComponent title="Usuń grupę" type="buttonRed" fontsize="1.5vh" />

                </td>
            </tr>
            <tr>
                <td>4</td>
                <td>Poniedziałek TN 11:15</td>
                <td>18/18</td>
                <td className="groupsComponentTableButtons">
                    <ButtonComponent title="Przeglądaj postępy" type="buttonBlue" fontsize="1.5vh" />
                    <ButtonComponent title="Edytuj grupę" type="buttonGreen" fontsize="1.5vh" />
                    <ButtonComponent title="Usuń grupę" type="buttonRed" fontsize="1.5vh" />

                </td>
            </tr>
            <tr>
                <td>5</td>
                <td>Poniedziałek TN 13:15</td>
                <td>18/18</td>
                <td className="groupsComponentTableButtons">
                    <ButtonComponent title="Przeglądaj postępy" type="buttonBlue" fontsize="1.5vh" />
                    <ButtonComponent title="Edytuj grupę" type="buttonGreen" fontsize="1.5vh" />
                    <ButtonComponent title="Usuń grupę" type="buttonRed" fontsize="1.5vh" />

                </td>
            </tr>
        </table>
    </RectangularContainer>;

export default GroupsComponent;