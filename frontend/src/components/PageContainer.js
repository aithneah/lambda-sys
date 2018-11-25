import React, {Component} from 'react';
import HeaderContainer from './header/HeaderContainer';
import ContentContainer from './content/ContentContainer';
import './PageContainer.css';
import Actions from "../store/actions";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";


class PageContainer extends Component {
    render() {
        return (
            <div className={"pageContainer"}>
                <div className={"pageHeader"}>
                    <HeaderContainer account={this.props.account}/>
                </div>
                <div className={"pageContent"}>
                    <ContentContainer account={this.props.account}
                                      groups={this.props.groups}
                                      declarations={this.props.declarations}
                                      getAccountData={this.props.getAccountData}
                                      getAllDeclarationsData={this.props.getAllDeclarationsData}
                                      getDeclarationStructureData={this.props.getDeclarationStructureData}
                                      getAllGroupsData={this.props.getAllGroupsData}
                                      getGroupsListsData={this.props.getGroupsListsData}
                                      getGroupsStudentsData={this.props.getGroupsStudentsData}
                                      getGroupsListSummary={this.props.getGroupsListSummary}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.account,
        declarations: state.declarations,
        groups: state.groups
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountData: Actions.getAccountData.withDispatch(dispatch),
        getAllDeclarationsData: Actions.getAllDeclarationsData.withDispatch(dispatch),
        getDeclarationStructureData: Actions.getDeclarationStructureData.withDispatch(dispatch),
        getAllGroupsData: Actions.getAllGroupsData.withDispatch(dispatch),
        getGroupsListsData: Actions.getGroupsListsData.withDispatch(dispatch),
        getGroupsStudentsData: Actions.getGroupsStudentsData.withDispatch(dispatch),
        getGroupsListSummary: Actions.getGroupsListSummary.withDispatch(dispatch)
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContainer));