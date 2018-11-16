import React from 'react';
import RectangularContainer from "../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../shared/ButtonComponent/ButtonComponent";
import "./DeclarationsComponent.scss";

const DeclarationsComponent = (props) => {
  return <RectangularContainer
      title="Deklaracje"
      // icon="file"
      // buttons={() => <>
      //     <ButtonComponent title="Dodaj coś" style="buttonGradient" fontsize="2vh" />
      //     <ButtonComponent title="Usuń coś" style="buttonGradient" fontsize="2vh" />
      //     </>}
  >
      <table width="100%" className="declarationsTable">
          <tr className="declarationsTableHead">
              <th className="declarationsTableTH">Lp.</th>
              <th className="declarationsTableTH">Numer listy</th>
              <th className="declarationsTableTH">Ostateczna data wypełnienia</th>
              <th className="declarationsTableTH">Wypełniono</th>
          </tr>
          <tr className="declarationsTableRow">
              <td className="declarationsTableTD">1</td>
              <td className="declarationsTableTD">Lista 7, Lista 8</td>
              <td className="declarationsTableTD">18.12.2018 23:59</td>
              <td className="declarationsTableTD">-</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełnij" style="buttonGradient" fontsize="2vh"/></td>
          </tr>
          <tr className="declarationsTableRow">
              <td className="declarationsTableTD">2</td>
              <td className="declarationsTableTD">Lista 5, Lista 6</td>
              <td className="declarationsTableTD">04.12.2018 23:59</td>
              <td className="declarationsTableTD">03.12.2018 17:23</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełniono" style="buttonGray" fontsize="2vh"/></td>
          </tr>
          <tr className="declarationsTableRow">
              <td className="declarationsTableTD">3</td>
              <td className="declarationsTableTD">Lista 3, Lista 4</td>
              <td className="declarationsTableTD">20.11.2018 23:59</td>
              <td className="declarationsTableTD">19.11.2018 13:44</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełniono" style="buttonGray" fontsize="2vh"/></td>
          </tr>
          <tr className="declarationsTableRow">
              <td className="declarationsTableTD">4</td>
              <td className="declarationsTableTD">Lista 1, Lista 2</td>
              <td className="declarationsTableTD">06.11.2018 23:59</td>
              <td className="declarationsTableTD">04.11.2018 10:12</td>
              <td className="declarationsTableTDButtons"><ButtonComponent title="Wypełniono" style="buttonGray" fontsize="2vh"/></td>
          </tr>
      </table>
  </RectangularContainer>
};

export default DeclarationsComponent;