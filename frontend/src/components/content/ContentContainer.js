import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomeMessageComponent from './HomeMessageComponent/HomeMessageComponent';
import LoginComponent from "./LoginComponent/LoginComponent";
import CommentComponent from "./CommentComponent/CommentComponent";
import DeclarationsComponent from "./DeclarationsComponent/DeclarationsComponent";
import DeclareComponent from "./DeclareComponent/DeclareComponent";
import './ContentContainer.css';

class ContentContainer extends React.Component {
    render() {
        return <div className="contentContainer">
            <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route exact path="/home" render={() => <HomeMessageComponent isLogged={false}/>}/>
                <Route exact path="/login" component={LoginComponent}/>
                <Route exact path="/comment" component={CommentComponent}/>
                <Route exact path="/declarations" component={DeclarationsComponent}/>
                <Route exact path="/declare" component={DeclareComponent}/>
            </Switch>
        </div>;
    }
}

export default ContentContainer;