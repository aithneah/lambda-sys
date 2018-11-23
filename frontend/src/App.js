import React, { Component } from 'react';
import PageContainer from './components/PageContainer';
import './App.scss';
import {withRouter} from "react-router-dom";

class App extends Component {

  render() {
    return (<PageContainer/>);
  }
}


export default withRouter(App);
