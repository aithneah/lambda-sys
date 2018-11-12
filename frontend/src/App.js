import React, { Component } from 'react';
import PageContainer from './components/PageContainer';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import './App.scss';

class App extends Component {

  render() {
    return (<PageContainer/>);
  }
}

const mapStateToProps = state => {
    return {
        students: state.students
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addStudent: (index, name, surname) => dispatch({type: actionTypes.ADD_STUDENT, index: index, name: name, surname: surname}),
        removeStudent: () => dispatch({type: actionTypes.REMOVE_STUDENT})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
