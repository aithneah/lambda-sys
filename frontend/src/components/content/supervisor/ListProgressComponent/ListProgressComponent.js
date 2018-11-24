import React from 'react';
import "./ListProgressComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import ExerciseTileComponent from "../../../shared/ExerciseTileComponent/ExerciseTileComponent";
import BadgeComponent from "../../../shared/BadgeComponent/BadgeComponent";
import CircleButtonComponent from "../../../shared/CircleButtonComponent/CircleButtonComponent";

const ListProgressComponent = (props) =>
    <RectangularContainer title="Lista 4 - grupa poniedziałek TP 11:15"
                          icon="bars"
                          buttons={() => <>
                              <ButtonComponent title="Edytuj grupę" type="buttonGradient" fontsize="2vh"/>
                              <ButtonComponent title="Powrót" type="buttonGradient" fontsize="2vh"/>
                          </>}
    >
        <table className="listProgressTable">
            <tr className="listProgressTableHead">
                <th>Numer indeksu</th>
                <th>Nazwisko i imię</th>
                <th></th>
                <th>Zad 1</th>
                <th>Zad 2</th>
                <th>Zad 3</th>
                <th>Zad 4</th>
                <th>Zad 5</th>
                <th>Zad 6</th>
                <th>Zad 7</th>
                <th>Zad 8</th>
                <th>Zad 9</th>
            </tr>
            <tr>
                <td>229836</td>
                <td>Bajcarzyk Michał</td>
                <td><BadgeComponent number={4} type="badgeGood"/></td>
                <td><ExerciseTileComponent type="exerciseHalfDone" tick={true}/></td>
                <td><ExerciseTileComponent type="exerciseUndone"/></td>
                <td><ExerciseTileComponent type="exerciseDone"/></td>
                <td><ExerciseTileComponent type="exerciseUndone"/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><CircleButtonComponent/></td>
            </tr>
            <tr>
                <td>256172</td>
                <td>Broda Pawel</td>
                <td><BadgeComponent number={2} type="badgeBad"/></td>
                <td><ExerciseTileComponent type="exerciseUndone"/></td>
                <td><ExerciseTileComponent type="exerciseDone"/></td>
                <td><ExerciseTileComponent type="exerciseDone"/></td>
                <td><ExerciseTileComponent type="exerciseDone"/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><CircleButtonComponent/></td>
            </tr>
            <tr>
                <td>232256</td>
                <td>Celikowska Michalina</td>
                <td><BadgeComponent number={4} type="badgeNeutral"/></td>
                <td><ExerciseTileComponent type="exerciseDone"/></td>
                <td><ExerciseTileComponent type="exerciseUndone"/></td>
                <td><ExerciseTileComponent type="exerciseUndone"/></td>
                <td><ExerciseTileComponent type="exerciseUndone"/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><CircleButtonComponent/></td>
            </tr>
        </table>
    </RectangularContainer>;

export default ListProgressComponent;