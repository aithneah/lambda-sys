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
import GroupProgressComponent from "./supervisor/GroupProgressComponent/GroupProgressComponent";
import ListProgressComponent from "./supervisor/ListProgressComponent/ListProgressComponent";
import StudentProgressComponent from "./supervisor/StudentProgressComponent/StudentProgressComponent";
import CommentComponent from "./supervisor/CommentComponent/CommentComponent";

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
                <Route exact path="/group" component={GroupProgressComponent}/>
                <Route exact path="/list" component={ListProgressComponent}/>
                <Route exact path="/student" component={StudentProgressComponent}/>
            </Switch>
        </>;
    }
}

export default ContentContainer;