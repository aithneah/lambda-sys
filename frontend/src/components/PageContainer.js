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
                    <HeaderContainer account={this.props.account}
                                     logOut={this.props.logOut}  />
                </div>
                <div className={"pageContent"}>
                    <ContentContainer account={this.props.account}
                                      groups={this.props.groups}
                                      declarations={this.props.declarations}
                                      student={this.props.student}
                                      comment={this.props.comment}
                                      getAccountData={this.props.getAccountData}
                                      getAllDeclarationsData={this.props.getAllDeclarationsData}
                                      getDeclarationStructureData={this.props.getDeclarationStructureData}
                                      getAllGroupsData={this.props.getAllGroupsData}
                                      getGroupsListsData={this.props.getGroupsListsData}
                                      getGroupsStudentsData={this.props.getGroupsStudentsData}
                                      getGroupsListSummary={this.props.getGroupsListSummary}
                                      getStudentProgress={this.props.getStudentProgress}
                                      logAsSupervisor={this.props.logAsSupervisor}
                                      updateDeclaration={this.props.updateDeclaration}
                                      setCommentData={this.props.setCommentData}
                                      applyComment={this.props.applyComment}
                                      commentFromTile={this.props.commentFromTile}
                                      deleteStudent={this.props.deleteStudent}  />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.account,
        declarations: state.declarations,
        groups: state.groups,
        student: state.student,
        comment: state.comment
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
        getGroupsListSummary: Actions.getGroupsListSummary.withDispatch(dispatch),
        getStudentProgress: Actions.getStudentProgress.withDispatch(dispatch),
        logAsSupervisor: Actions.logAsSupervisor.withDispatch(dispatch),
        logOut: Actions.logOut.withDispatch(dispatch),
        updateDeclaration: Actions.updateDeclaration.withDispatch(dispatch),
        setCommentData: Actions.setCommentData.withDispatch(dispatch),
        applyComment: Actions.applyComment.withDispatch(dispatch),
        commentFromTile: Actions.commentFromTile.withDispatch(dispatch),
        deleteStudent: Actions.deleteStudent.withDispatch(dispatch)
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContainer));