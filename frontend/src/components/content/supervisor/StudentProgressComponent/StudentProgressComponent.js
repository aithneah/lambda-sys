import React from 'react';
import "./StudentProgressComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import ProgressChartComponent from "./ProgressChartComponent/ProgressChartComponent";
import AverageComponent from "./AverageComponent/AverageComponent";
import PercentageComponent from "./PercentageComponent/PercentageComponent";
import DeclarationsOverviewComponent from "./DeclarationsOverviewComponent/DeclarationsOverviewComponent";

const StudentProgressComponent = (props) =>
    <RectangularContainer title="Bajcarzyk Michał 256374"
                          icon="user"
                          buttons={() => <>
                              <ButtonComponent title="Pytaj" style="buttonGradient" fontsize="2vh"/>
                              <ButtonComponent title="Powrót" style="buttonGradient" fontsize="2vh"/>
                          </>}>
        <div className="studentProgressContainer">
            <div className="studentProgressChartPercetageAndAverage">
                <div className="studentProgressChart">
                    <div className="studentProgressSectionTitle">Poziom ukończenia każdej listy zadań:</div>
                    <ProgressChartComponent percentage={[0, 55, 100]}/>
                </div>
                <div className="studentProgressPercentageAndAverage">
                    <div className="studentProgressPercentage">
                        <div className="studentProgressSectionTitle">Procent wykonania wszystkich zadań:</div>
                        <PercentageComponent percentage={90}/>
                    </div>
                    <div className="studentProgressAverage">
                        <div className="studentProgressSectionTitle">Dotychczasowa ocena odpowiedzi:</div>
                        <AverageComponent average="pozytywny"/>
                    </div>
                </div>
            </div>
            <div className="studentProgressDeclarations">
                <DeclarationsOverviewComponent/>
            </div>
        </div>
    </RectangularContainer>;

export default StudentProgressComponent;