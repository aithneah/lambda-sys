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
                                     getAccountData={this.props.getAccountData}/>
                </div>
                <div className={"pageContent"}>
                    <ContentContainer account={this.props.account}
                                      declarations={this.props.declarations}
                                      getAllDeclarationsData={this.props.getAllDeclarationsData}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.account,
        declarations: state.declarations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountData: Actions.getAccountData.withDispatch(dispatch),
        getAllDeclarationsData: Actions.getAllDeclarationsData.withDispatch(dispatch)
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContainer));