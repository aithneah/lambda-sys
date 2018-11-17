import React from 'react';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import "./DeclarationsComponent.scss";

const DeclarationsComponent = (props) => {
  return <RectangularContainer
      title="Deklaracje">
      <table className="declarationsTable">
          <tr className="declarationsTableHeader">
              <th>Lp.</th>
              <th>Numer listy</th>
              <th>Ostateczna data wypełnienia</th>
              <th>Wypełniono</th>
          </tr>
          <tr>
              <td>1</td>
              <td>Lista 7, Lista 8</td>
              <td>18.12.2018 23:59</td>
              <td>-</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełnij" style="buttonGradient" fontsize="2vh"/></td>
          </tr>
          <tr>
              <td>2</td>
              <td>Lista 5, Lista 6</td>
              <td>04.12.2018 23:59</td>
              <td>03.12.2018 17:23</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełniono" style="buttonGray" fontsize="2vh"/></td>
          </tr>
          <tr>
              <td>3</td>
              <td>Lista 3, Lista 4</td>
              <td>20.11.2018 23:59</td>
              <td>19.11.2018 13:44</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełniono" style="buttonGray" fontsize="2vh"/></td>
          </tr>
          <tr>
              <td>4</td>
              <td>Lista 1, Lista 2</td>
              <td>06.11.2018 23:59</td>
              <td>04.11.2018 10:12</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełniono" style="buttonGray" fontsize="2vh"/></td>
          </tr>
      </table>
  </RectangularContainer>
};

export default DeclarationsComponent;