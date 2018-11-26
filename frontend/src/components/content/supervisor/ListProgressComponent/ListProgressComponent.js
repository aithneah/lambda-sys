import React, {Component} from 'react';
import "./ListProgressComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import ExerciseTileComponent from "../../../shared/ExerciseTileComponent/ExerciseTileComponent";
import BadgeComponent from "../../../shared/BadgeComponent/BadgeComponent";
import CircleButtonComponent from "../../../shared/CircleButtonComponent/CircleButtonComponent";
import {withRouter} from "react-router-dom";

class ListProgressComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchListsSummary() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getGroupsListSummary(this.props.groupId, this.props.listId);
    }

    componentDidMount() {
        this.fetchListsSummary();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchListsSummary();
    }

    completeWithTd = (number) => new Array(number).fill(0).map((e, i) => <td key={i + 'td'}/>);

    buildPartialData = (nodes) => {
        return nodes.map(node =>
            node.isDeclared === "fully"
                ? node.name
                : (node.isDeclared === "not"
                    ? ""
                    : node.name + " - " + this.buildPartialData(node.children))).filter(s => s.length !== 0);
    };

    render() {
        let currentListName = this.props.group.lists
            .find(list => list.id === this.props.listId).name;

        return <RectangularContainer title={currentListName + " -  Grupa " + this.props.group.classesDate}
                                     icon="bars"
                                     buttons={() => <>
                                         <ButtonComponent title="Edytuj grupę" type="buttonGradient" fontsize="2vh"/>
                                         <ButtonComponent title="Powrót" type="buttonGradient" fontsize="2vh"/>
                                     </>}
        >
            <table className="listProgressTable">
                <tbody>
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
                {this.props.group.summary && this.props.group.summary
                    .map((student, i) => {
                        return <tr key={i}>
                            <td onClick={() => this.props.history.push("/students/" + student.index)}>{student.index}</td>
                            <td onClick={() => this.props.history.push("/students/" + student.index)}>{student.name}</td>
                            <td onClick={() => this.props.history.push("/students/" + student.index)}><BadgeComponent number={student.answersCount} type={"badge-" + student.overallNote}/>
                            </td>
                            {student.declarationStructure.structure
                                .find(list => list.name === currentListName).children
                                .map((exercise, i) => <td key={"e" + i}>
                                    <ExerciseTileComponent type={"exercise-" + exercise.isDeclared}
                                                           tick={exercise.isChecked}
                                                           popover={exercise.isDeclared === "partially"}
                                                           exerciseDetails={this.buildPartialData(exercise.children).join("\n")}/>
                                </td>)}

                            {this.completeWithTd(9 - student.declarationStructure.structure
                                .find(list => list.name === currentListName).children.length)}
                            <td><CircleButtonComponent/></td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </RectangularContainer>;
    }
}

export default withRouter(ListProgressComponent);