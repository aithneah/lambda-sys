import React, {Component} from 'react';
import "./GroupsStudentsComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import {Icon} from "antd";

class GroupsStudentsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchGroupsStudentsData() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getGroupsStudentsData(this.props.groupId);
    }

    componentDidMount() {
        this.fetchGroupsStudentsData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchGroupsStudentsData();
    }


    render() {
        return <RectangularContainer title={"Edytuj grupę - " + this.props.group.classesDate}
                                     icon="team">
            {this.state.isLoading ? <div className="declarationsComponentLoading"><Icon type="loading" /></div> : <table className="groupsStudentsTable">
                <tbody>
                <tr className="groupsStudentsTableHeader">
                    <th>Numer indeksu</th>
                    <th>Imię i nazwisko</th>
                </tr>
                {this.props.group.students && this.props.group.students
                    .map((student, i) => <tr key={i}>
                        <td>{student.index}</td>
                        <td>{student.name}</td>
                        <td className="groupsStudentsTableButtons">
                            <ButtonComponent title="Przepisz do innej grupy"
                                             type="buttonBlue"
                                             fontsize="2vh"/>
                            <ButtonComponent title="Usuń z grupy"
                                             type="buttonRed"
                                             onClick={() => this.props.deleteStudent(student.index)}
                                             fontsize="2vh"/>
                        </td>
                    </tr>)}
                </tbody>
            </table>}
        </RectangularContainer>;
    }
}

export default GroupsStudentsComponent;