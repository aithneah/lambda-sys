import React, {Component} from 'react';
import "./GroupsListsComponent.scss";
import RectangularContainer from "../../../shared/RectangularContainer/RectangularContainer";
import {withRouter} from "react-router-dom";
import {Icon} from "antd";

class GroupsListsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    fetchGroupsListData() {
        if (!this.state.isLoading) this.setState({isLoading: true});
        this.props.getGroupsListsData(this.props.groupId);
    }

    componentDidMount() {
        this.fetchGroupsListData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading && this.state.isLoading) this.setState({isLoading: false});
        else if (!prevState.isLoading && !this.state.isLoading) this.fetchGroupsListData();
    }

    dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    render() {
        const locale = window.navigator.language;

        return <RectangularContainer title="Grupa Poniedziałek TP 11:15"
                                     icon="team">
            {this.state.isLoading ? <div className="declarationsComponentLoading"><Icon type="loading" /></div> :
                <table className="groupsListsTable">
                <tbody>
                <tr className="groupsListsTableHeader">
                    <th>Lp.</th>
                    <th>Numer listy</th>
                    <th>Ostateczna data wypełnienia</th>
                    <th>Liczba osób, która wypełniła deklarację</th>
                </tr>
                {this.props.group.lists &&
                this.props.group.lists
                    .map((list, i) => {
                        return <tr key={i}
                                   onClick={() => this.props.history.push("/groups/" + this.props.groupId
                                       + "/lists/" + list.id + "/summary")}>
                            <td>{i + 1}</td>
                            <td>{list.name}</td>
                            <td>{new Date(list.classesDate).toLocaleString(locale, this.dateOptions)}</td>
                            <td>{list.numberOfDeclarations + "/" + this.props.group.studentCount}</td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </RectangularContainer>;
    }
}

export default withRouter(GroupsListsComponent);