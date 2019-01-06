import React, {Component} from 'react';
import "./StudentProgressComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import ProgressChartComponent from "./ProgressChartComponent/ProgressChartComponent";
import AverageComponent from "./AverageComponent/AverageComponent";
import PercentageComponent from "./PercentageComponent/PercentageComponent";
import DeclarationsOverviewComponent from "./DeclarationsOverviewComponent/DeclarationsOverviewComponent";
import {Icon} from "antd";
import {withRouter} from "react-router-dom";

class StudentProgressComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchStudentProgress() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getStudentProgress(this.props.studentId);
    }

    componentDidMount() {
        this.fetchStudentProgress();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchStudentProgress();
    }

    render() {
        return <RectangularContainer
            title={this.props.student ? this.props.student.name + " " + this.props.student.index : ""}
            icon="user"
            buttons={() => <>
                <ButtonComponent title="Pytaj"
                                 type="buttonGradient"
                                 fontsize="2.2vh"
                                 onClick={() => this.props.history.push("/students/"
                                     + this.props.student.index + "/commentOptions")}/>
                <ButtonComponent title="Powrót" type="buttonGradient" fontsize="2.2vh"/>
            </>}>
            {this.state.isLoading ? <div className="declarationsComponentLoading"><Icon type="loading"/></div> :
                <div className="studentProgressContainer">
                    <div className="studentProgressChartPercetageAndAverage">
                        <div className="studentProgressChart">
                            <div className="studentProgressSectionTitle">Poziom ukończenia każdej listy zadań:</div>
                            <ProgressChartComponent
                                percentage={this.props.student ? this.props.student.listsPercentage : []}/>
                        </div>
                        <div className="studentProgressPercentageAndAverage">
                            <div className="studentProgressPercentage">
                                <div className="studentProgressSectionTitle">Procent wykonania wszystkich zadań:</div>
                                <PercentageComponent
                                    percentage={this.props.student ? this.props.student.overallExercisesPercentage : 0}/>
                            </div>
                            <div className="studentProgressAverage">
                                <div className="studentProgressSectionTitle">Dotychczasowa ocena odpowiedzi:</div>
                                <AverageComponent average={this.props.student ?
                                    (this.props.student.overallNote === "good" ? "pozytywny"
                                        : (this.props.student.overallNote === "bad" ? "negatywny" : "neutralny"))
                                    : "nieznany"}/>
                            </div>
                        </div>
                    </div>
                    <div className="studentProgressDeclarations">
                        <DeclarationsOverviewComponent
                            lists={this.props.student ? this.props.student.declarationStructure.structure : null}/>
                    </div>
                </div>}
        </RectangularContainer>;
    }
}

export default withRouter(StudentProgressComponent);