import React from 'react';
import "./GroupProgressComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";

const GroupProgressComponent = (props) =>
    <RectangularContainer title="Grupa Poniedziałek TP 11:15"
                          icon="team">
        <table className="groupProgressTable">
            <tr className="groupProgressTableHeader">
                <th>Lp.</th>
                <th>Numer listy</th>
                <th>Ostateczna data wypełnienia</th>
                <th>Liczba osób, która wypełniła deklarację</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Lista 1</td>
                <td>15.10.2018</td>
                <td>15/18</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Lista 2</td>
                <td>24.10.2018</td>
                <td>16/18</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Lista 3</td>
                <td>24.10.2018</td>
                <td>18/18</td>
            </tr>
        </table>
    </RectangularContainer>;

export default GroupProgressComponent;