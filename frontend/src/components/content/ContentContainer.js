import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomeMessageComponent from './shared/HomeMessageComponent/HomeMessageComponent';
import LoginComponent from "./shared/LoginComponent/LoginComponent";
import CommentOptionsComponent from "./supervisor/CommentOptionsComponent/CommentOptionsComponent";
import DeclarationsComponent from "./student/DeclarationsComponent/DeclarationsComponent";
import DeclareComponent from "./student/DeclareComponent/DeclareComponent";
import './ContentContainer.css';
import SettingsComponent from "./student/SettingsComponent/SettingsComponent";
import GroupsComponent from "./supervisor/GroupsComponent/GroupsComponent";
import GroupsListsComponent from "./supervisor/GroupsListsComponent/GroupsListsComponent";
import ListProgressComponent from "./supervisor/ListProgressComponent/ListProgressComponent";
import StudentProgressComponent from "./supervisor/StudentProgressComponent/StudentProgressComponent";
import CommentComponent from "./supervisor/CommentComponent/CommentComponent";
import GroupsStudentsComponent from "./supervisor/GroupsStudentsComponent/GroupsStudentsComponent";
import ListsComponent from "./supervisor/ListsComponent/ListsComponent";
import ExercisesComponent from "./supervisor/ExercisesComponent/ExercisesComponent";

class ContentContainer extends React.Component {
    render() {
        return <>
            <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route exact path="/home" render={() => <HomeMessageComponent isLogged={this.props.account}/>}/>
                <Route exact path="/login" render={() => <LoginComponent getAccountData={this.props.getAccountData}/>}/>
                <Route exact path="/commentOptions" component={CommentOptionsComponent}/>
                <Route exact path="/comment" component={CommentComponent}/>
                <Route exact path="/declarations"
                       render={() => <DeclarationsComponent declarations={this.props.declarations}
                                                            getAllDeclarationsData={this.props.getAllDeclarationsData}/>
                       }/>
                <Route exact path="/declare/:classesId"
                       render={(props) =>
                           (<DeclareComponent classesId={props.match.params.classesId}
                                              structure={this.props.declarations
                                                  .find(d => d.classesId === props.match.params.classesId).structure}
                                              getDeclarationStructureData={this.props.getDeclarationStructureData}/>)}/>
                <Route exact path="/settings" render={() => <SettingsComponent account={this.props.account}/>}/>
                <Route exact path="/groups" render={() =>
                    <GroupsComponent groups={this.props.groups}
                                     getAllGroupsData={this.props.getAllGroupsData}/>}/>
                <Route exact path="/groups/:id/lists" render={(props) =>
                    <GroupsListsComponent groupId={props.match.params.id}
                                          getGroupsListsData={this.props.getGroupsListsData}
                                          group={this.props.groups.find(group => group.id === props.match.params.id)}/>}
                />
                <Route exact path="/groups/:id/students" render={(props) =>
                    <GroupsStudentsComponent groupId={props.match.params.id}
                                             getGroupsStudentsData={this.props.getGroupsStudentsData}
                                             group={this.props.groups.find(group => group.id === props.match.params.id)}/>}
                />
                <Route exact path="/groups/:groupId/lists/:listId/summary" render={(props) =>
                    <ListProgressComponent groupId={props.match.params.groupId}
                                           listId={props.match.params.listId}
                                           getGroupsListSummary={this.props.getGroupsListSummary}
                                           group={this.props.groups.find(group =>
                                               group.id === props.match.params.groupId)}/>}/>
                <Route exact path="/students/:studentId" render={(props) =>
                    <StudentProgressComponent getStudentProgress={this.props.getStudentProgress}
                                              studentId={props.match.params.studentId}
                                              student={this.props.student}/>}/>
                <Route exact path="/lists" render={() => <ListsComponent/>} />
                <Route exact path="/lists/:listId" render={(props) =>
                    <ExercisesComponent listId={props.match.params.listId}/>}/>
            </Switch>
        </>;
    }
}

export default ContentContainer;