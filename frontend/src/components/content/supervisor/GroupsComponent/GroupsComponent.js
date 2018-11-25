import React, {Component} from 'react';
import './GroupsComponent.scss';
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import ButtonComponent from "../../../shared/ButtonComponent/ButtonComponent";
import {withRouter} from "react-router-dom";

class GroupsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchGroupsData() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getAllGroupsData();
    }

    componentDidMount() {
        this.fetchGroupsData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchGroupsData();
    }

    render() {
        return <RectangularContainer
            title="Zarządzaj grupami"
            icon="team"
            buttons={() => <>
                <ButtonComponent title="Dodaj nowego studenta" type="buttonGradient" fontsize="2vh" />
                <ButtonComponent title="Dodaj nową grupę" type="buttonGradient" fontsize="2vh" />
            </>}>
            <table className="groupsComponentTable">
                <tbody>
                <tr className="groupsComponentTableHeader">
                    <th>Lp.</th>
                    <th>Termin zajęć grupy</th>
                    <th>Liczba zapisanych osób</th>
                </tr>
                {this.props.groups && this.props.groups.map((group, i) => {
                    return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{group.classesDate}</td>
                        <td>{group.studentCount + "/18"}</td>
                        <td className="groupsComponentTableButtons">
                            <ButtonComponent title="Przeglądaj postępy"
                                             type="buttonBlue"
                                             fontsize="2vh"
                                             onClick={() => this.props.history.push("/groups/" + group.id + "/lists")}/>
                            <ButtonComponent title="Edytuj grupę"
                                             type="buttonGreen"
                                             fontsize="2vh"
                                             onClick={() => this.props.history.push("/groups/" + group.id + "/students")}/>
                            <ButtonComponent title="Usuń grupę" type="buttonRed" fontsize="2h" />
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </RectangularContainer>;
    }
}


export default withRouter(GroupsComponent);